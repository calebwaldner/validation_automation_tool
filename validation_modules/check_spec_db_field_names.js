// For ESLint
/*eslint-env node*/

// The purpose of this module is to provide the user with a list of field names from the spec and database that should be reviewed due to problems with matching.

function matchSpecNamesAndDBNames(dbData, specData, isCheckpoint = false) {

  // an array of all the spec field names
  const specFieldNames = specData.map(field => field.field);
  const dbFieldNames = dbData.map(field => field.field);

  const specResultsTest = specData
    .filter(field => !dbFieldNames.includes(field.field)) // if Spec field name cannot be found in the list of DB field names
    .filter(field => field.developed !== "Obsolete"); // if Spec field is not marked as obsolete, meaning it wouldn't be in the database
  const dbResults = dbData
    .filter(field => !specFieldNames.includes(field.field)) // if DB field name cannot be found in the list of Spec field names
    .filter(field => field.ca) // CA must have a value to return truthy. This filters results that have no CAs and wouldn't be in the spec anyway
    .filter(field => field.field !== "Field Name") // embedded tables will create these fields
    .reduce((acc, field) => {  // prevents duplicate db names (since each CA creates duplicate fields). This isn't needed for the spec since each row in the spec was created manually
      return acc.includes(field.field) ? acc : [...acc, field.field]
    }, []);


  //// RESULTS 

  // if there are results (results array greater than 0), 
  if (specResultsTest.length > 0 || dbResults.length > 0) {
    // if in checkpoint mode, throw an error if this test didn't pass the checkpoint.
    if (isCheckpoint) {throw Error("Database field and spec label mismatch")}

    // results, not in checkpoint mode
    // spec results
    console.log(`\nThese field names from the Spec are not found in the Database:`);
    console.table(specResultsTest, ["field", "type"])
    // db results
    console.log(`\nThese field names from the Database are not found in the Spec:`);
    console.table(dbResults);
  } else {
    // results for checkpoint mode
    if (isCheckpoint) {return true} 

    // not in checkpoint mode
    console.log(`There are no results!`); // not in checkpoint mode
  }

}
    

// Export
module.exports.run = matchSpecNamesAndDBNames;

