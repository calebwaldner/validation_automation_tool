/*eslint-env node*/

const Papa = require("./../node_modules/papaparse");
const PapaConfig = {
	quotes: false, //or array of booleans
	quoteChar: '"',
	escapeChar: '"',
	delimiter: ",",
	header: true,
	newline: "\r\n",
	skipEmptyLines: false, //or 'greedy',
	columns: null //or array of strings
}

// for QV less/greater values; uses a strict text, not very flexible
const regexLessThanText = /less than /;
const regexGreaterThanText = /greater than /;
const regexLess = /(?<=less than )-?\d+/g;
const regexGreater = /(?<=greater than )-?\d+/g;

// for getting QV fields
const regexSpecQVLogic = /(QV(\s\d)?)/;
const regexDBQVLogic = /_QV\d?/g;

const specQVFieldRangeArr = []

/**
 * Prints a CSV file to the terminal. Also checks that low and high values match between the spec and db.
 * @param {object} dbData 
 * @param {object} specData 
 */
function getQV(dbData, specData) {

  // get QV fields from both db and spec
  const specQVFields = specData
    // check that spec field has QV type
    .filter(field => regexSpecQVLogic.test(field.type))
    .filter(specField => !/^Obsolete\s?$/.test(specField.developed)) // if NOT "Obsolete";
    .forEach(specField => {

      // filter the dbFields to the matching spec field name and field type
      const dbMatchingFieldArr = dbData
        .filter(dbField => {return specField.field === dbField.field && specField.type === dbField.type});


      // this filters out the 0 results.
      let dbMatching; 
      // dbMatchingFieldArr var is an object or blank array
      if (dbMatchingFieldArr.length > 0) {
        // if there are two matching fields, this throws an arror as this should never happen.
        if (dbMatchingFieldArr.length > 1) {
          console.log("The Spec:", specField);
          console.log("The Database:", dbMatchingFieldArr);
          throw Error("Two fields from the database have the same field name and type, investigate this.");
        } else {
          dbMatching = dbMatchingFieldArr[0];
          // console.log(dbMatchingFieldArr)
          // throws errors if the QV logic doesn't match. QV logic does not have a "check", rather the low and high values get checked when the getQV function is run.
          if (specField.lowRange !== dbMatching.lowRange) {
            console.log(specField, dbMatching);
            throw Error("These fields do not have matching low range");
          }

          if (specField.highRange !== dbMatching.highRange) {
            console.log(specField, dbMatching);
            throw Error("These fields do not have matching high range");
          }
        }
      }

      

      // used to make a 2D array
      let result = {};
      result.field = specField.field;

      // to make the regex simple, I am going to first test that the wording is exactly "less than #" and "more than #". Then I'm going to use the less/more text to grab the exact numbers I want.
      if (regexLessThanText.test(specField.logic)) {
        result.less = specField.logic.match(regexLess);
      } else {
        result.less = null;
      }
      if (regexGreaterThanText.test(specField.logic)) {
        result.greater = specField.logic.match(regexGreater);
      } else {
        result.greater = null;
      }

      specQVFieldRangeArr.push(result);
    })
  
  const resultsJSON = JSON.stringify(specQVFieldRangeArr);
  // console.log(resultsJSON);

  const csv = Papa.unparse(resultsJSON);

    
  console.log(`\nCOPY EVERYTHING BELOW THE LINE\n*********************************************\n\n${csv}\n\n*********************************************`);
    
  



  // Future Updates:
  // // check that the fields that should have qv logic do
  // // check that the same low values and high values are in both the spec and database
  // // // This would require the CA from the database be split into their own variables, as specified below in the descriptive test.

  // BUG if there is two QV logics in the same field, it's possible that one of them gets missed by this match function if one is missing but the other exists. The existing logic will pass the field, even if it is missing it's other QV logic. This can be fixed by capturing exactly the text of the QV (such as "QV" or "QV 2") and check for this AFTER the fields have matched names. So the current code is good, this extra "exact match" check just needs to be added

  // This function isn't very useful and was an attempt to fix the bug above and still requires testing to be trusted. Advise that more testing done in order to make use of this function.
  // Problem: the database CA column has one big string with all it's logic. This makes matching QV logic when there are multiple code blocks of it in one string so so difficult (maybe impossible). The way to fix this would be to parse those code blocks to separate them from one another. Once separated (yet still associated with the original field, this would be done by handling all this parsing within a forEach loop so it happens in the scope of each field), then you can check if each exact type of logic match.
  // function getQVFieldList() {
  //   specQVFields.forEach(specField => {
  //     dbQVFields.forEach(dbField => {
  //       if (specField.Field === dbField["Field Name"]) {
  //         const specType = specField.Type.replace(/\s/, '');
  //         const formattedSpecType = `_${specType}`;
  
  //         console.log(`${specField.Field} - ${formattedSpecType} --- --- ${dbField["Field Name"]} - ${dbField["Conditional Actions"].match(regexDBQVLogic)}`);
  //       }
  //     })
  //   });
  // }

}


module.exports.run = getQV;