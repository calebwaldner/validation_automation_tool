
// The goal of this module is to provide the user with a list of field names from the spec and database that should be reviewed due to problems with matching.




function checkSpecFieldNames(specData) {


// For each spec field name
  // Find a match in the db
    // If match is found
      // Spec field name is flaged as passing
      // db field name is flagged as passing
    // If no match, push spec field to results arr
// log results arr with spec field names.
// log the db fields that never got a passing 




console.log(specData);





}






// Export
module.exports.run = checkSpecFieldNames;