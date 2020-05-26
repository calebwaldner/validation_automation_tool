// For ESLint
/*eslint-env node*/

function checkRequired(dbData, specData, isCheckpoint = false) {
  
  // Both these functions work the same way.
  /* Here is a breakdown
  They take a whole dataset (we will call it the origial data)
  Filter that dataset to only those that are set to required
  Filter those resluts again against a list from the other dataset
    The other set is filtered by those that are required
    Then mapped to only be an array of their field names
  Finally, if the required field from the original dataset is NOT included in the list of required fields from the other dataset, it is returned to be posted to the console. 
  */

  // We run this function with both data sets to insure every scnario of discrepencies is found.

  const specResults = specData
    .filter(specField => /^REQ\s?$/.test(specField.type)) // uses regex to accomidate for an extra space at the end of "REQ", just in case
    .filter(specField => !/^Obsolete\s?$/.test(specField.developed)) // if NOT "Obsolete"
    .filter(specField => {
      
      return !(dbData // This filters the db data down to just the row column.
                  .filter(dbField => dbField.required)
                  .map(dbField => dbField.field))

    .includes(specField.field)
    });


  const dbResults = dbData
    .filter(dbField => dbField.required)
    .filter(dbField => {
      
      return !(specData // This filters the db data down to just the row column.
                .filter(specField => /^REQ\s?$/.test(specField.type))
                .filter(specField => !/^Obsolete\s?$/.test(specField.developed))
                .map(specField => specField.field))

    .includes(dbField.field)
    });
    

  //////////// RESULTS ////////////

  // if there are results (results array greater than 0), 
  if (specResults.length > 0 || dbResults.length > 0) {
    // if in checkpoint mode, throw an error if this test didn't pass the checkpoint.
    if (isCheckpoint) {throw Error("A problem with required logic")}

    // results, not in checkpoint mode
    // spec results
    console.log(`\nThese results are Required in the Spec but not in the Database:`);
    console.table(specResults, ["field", "required", "type"]);
    // db results
    console.log(`\nThese results are Required in the Database but not in the Spec:`);
    console.table(dbResults, ["field", "required"]);
  } else {
    // results for checkpoint mode
    if (isCheckpoint) {return true} 

    // not in checkpoint mode
    console.log(`There are no results!`); // not in checkpoint mode
  }
}


module.exports.run = checkRequired;