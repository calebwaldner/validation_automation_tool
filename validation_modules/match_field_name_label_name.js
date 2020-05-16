/***************************************************
 * Field Name VS CA Label Name
***************************************************/

// This matches field names out of the logic labels. 
const patternForFirstFieldName = /(?<=(.* - ))\w*(?=_)/g 


/**
 * Finds discrepancies between the field name in the field column and the logic label field name. Posts results to the console.
 * @param {json} databaseData - the "standard format" database json
 */
function matchFieldNames(databaseData) {
  const resultsArr = [];

  databaseData.forEach((field, i) => {
    const fieldName = field["Field Name"];
    const fieldCA = field["Conditional Actions"];
    const logicLabelFieldNames = fieldCA.match(patternForFirstFieldName);
    // console.log(i, fieldName, logicLabelFieldNames); // logs all fields and logic lables, used for reference

    // populates resultsArr with each finding of (label name !== field name)
    if (logicLabelFieldNames !== null) {
      logicLabelFieldNames.forEach(logicLableFieldName => {
        if (logicLableFieldName !== fieldName) {
          resultsArr.push(`Field #${i+1}: ${fieldName} does not match ${logicLableFieldName}`);
          // TODO: This message could be improved to show what the original logic label was.
        }
      });
    }
  });
  
  // populates resultsArr with a message if no mismatch results are found
  if (resultsArr.length < 1) {resultsArr.push("No results were found!")}

  console.log(resultsArr);
}

// Export 
module.exports.run = matchFieldNames;

