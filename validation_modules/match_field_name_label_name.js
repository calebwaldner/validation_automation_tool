/***************************************************
 * Field Name VS CA Label Name
***************************************************/

// /*eslint-env node*/

function matchFieldLogicLabel(dbData, isCheckpoint = false) {
  // console.log(argsArr)
  const resultsArr = []

  // for each object, if there is ca, store the result of the checkLogicLabelField(), 
  dbData.forEach((dbObject) => {
    if (dbObject.ca) { 

      // checkLogicLabelField() returns object if the field and logic label don't match.
      const result = dbObject.checkLogicLabelField(); 
      
      // filters blank fields and not matching 'Field Name' prevents headers for normalized embeded log from populating results
      if (result.field && result.field !== 'Field Name' ) {
        resultsArr.push(result);
      }
    }
    
  });


  //// RESULTS 

  // if there are results (results array greater than 0), then fail the checkpoint or give results, depending on if in checkpoint mode or not.
  if (resultsArr.length > 0) {

    // if in checkpoint mode, throw an error if this test didn't pass the checkpoint.
    if (isCheckpoint) {throw Error("Field and logic label mismatch")}
    
    // results, not in checkpoint mode
    console.table(resultsArr, ["field", "logicLabelField"]);
  } else {
    if (isCheckpoint) {return true} // results for checkpoint mode
    console.log(`There are no results!`); // not in checkpoint mode
  }
  
}

// Export 
module.exports.run = matchFieldLogicLabel;

