
// The purpose of this module is to provide the user with a list of field names from the spec and database that should be reviewed due to problems with matching.

function checkSpecDBFieldNames(dbData, specData) {

  // an array of all the spec field names
  const specFieldNames = specData.map(field => field.Field);
  const dbFieldNames = dbData.map(field => field["Field Name"]);

  const specResultsTest = specData
    .filter(field => !dbFieldNames.includes(field.Field)) // if Spec field name cannot be found in the list of DB field names
    .map(field => `${field.Field} - ${field.Type}`)
    console.log(`\nThese field names from the Spec are not found in the Database:\n `, specResultsTest);
  

  const dbResults = dbData
    .filter(field => !specFieldNames.includes(field["Field Name"])) // if DB field name cannot be found in the list of Spec field names
    .filter(field => field["Conditional Actions"]) // CA must have a value to return truthy. This filters results that have no CAs and wouldn't be in the spec anyway
    .filter(field => field["Field Name"] !== "Field Name") // embedded tables will create these fields
    .map(field => field["Field Name"])
  console.log(`\nThese field names from the Database are not found in the Spec:\n `, dbResults);
  
}
    

// Export
module.exports.run = checkSpecDBFieldNames;

