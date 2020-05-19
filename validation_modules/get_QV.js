
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


function getQV(dbData, specData, args) {

  const specQVFields = specData.filter(field => regexSpecQVLogic.test(field.Type));
  const dbQVFields = dbData.filter(field => regexDBQVLogic.test(field["Conditional Actions"]));
  
  // returns a 2D array
  function getLowValues() {
    const specQVFieldAndLowArr = []
    specQVFields.forEach(field => {
      let result = {};
      result.field = field.Field;

      // to make the regex simple, I am going to first test that the wording is exactly "less than #" and "more than #". Then I'm going to use the less/more text to grab the exact numbers I want.

      if (regexLessThanText.test(field.Logic)) {
        result.less = field.Logic.match(regexLess);
      } else {
        result.less = null;
      }
      
      if (regexGreaterThanText.test(field.Logic)) {
        result.greater = field.Logic.match(regexGreater);
      } else {
        result.greater = null;
      }

      specQVFieldAndLowArr.push(result);
    })
    const resultsJSON = JSON.stringify(specQVFieldAndLowArr);
    // console.log(resultsJSON);

    const csv = Papa.unparse(resultsJSON);

    
    console.log(`\nCOPY EVERYTHING BELOW THE LINE\n*********************************************\n\n${csv}\n\n*********************************************`);
    

  }
  getLowValues();
  



  // Future Updates:
  // // check that the fields that should have qv logic do
  // // check that the same low values and high values are in both the spec and database
  // // // This would require the CA from the database be split into their own variables, as specified below in the descriptive test.

  // BUG if there is two QV logics in the same field, it's possible that one of them gets missed by this match function if one is missing but the other exists. The existing logic will pass the field, even if it is missing it's other QV logic. This can be fixed by capturing exactly the text of the QV (such as "QV" or "QV 2") and check for this AFTER the fields have matched names. So the current code is good, this extra "exact match" check just needs to be added

  // This function isn't very useful and was an attempt to fix the bug above and still requires testing to be trusted. Advise that more testing done in order to make use of this function.
  // Problem: the database CA column has one big string with all it's logic. This makes matching QV logic when there are multiple code blocks of it in one string so so difficult (maybe impossible). The way to fix this would be to parse those code blocks to separate them from one another. Once separated (yet still associated with the original field, this would be done by handling all this parsing within a forEach loop so it happens in the scope of each field), then you can check if each exact type of logic match.
  function getQVFieldList() {
    specQVFields.forEach(specField => {
      dbQVFields.forEach(dbField => {
        if (specField.Field === dbField["Field Name"]) {
          const specType = specField.Type.replace(/\s/, '');
          const formattedSpecType = `_${specType}`;
  
          console.log(`${specField.Field} - ${formattedSpecType} --- --- ${dbField["Field Name"]} - ${dbField["Conditional Actions"].match(regexDBQVLogic)}`);
        }
      })
    });
  }

  

}


module.exports.run = getQV;