
function checkRequired(dbData, specData, args) {
  
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
    .filter(specField => /^REQ\s?$/.test(specField.Type)) // uses regex to accomidate for an extra space at the end of "REQ", just in case
    .filter(specField => !/^Obsolete\s?$/.test(specField.Developed)) // if NOT "Obsolete"
    .filter(specField => {
      
      return !(dbData // This filters the db data down to just the row column.
                  .filter(dbField => dbField.Required === "Yes")
                  .map(dbField => dbField["Field Name"]))

    .includes(specField.Field)
    });


  const dbResults = dbData
    .filter(dbField => dbField.Required === "Yes")
    .filter(dbField => {
      
      return !(specData // This filters the db data down to just the row column.
                .filter(specField => /^REQ\s?$/.test(specField.Type))
                .filter(specField => !/^Obsolete\s?$/.test(specField.Developed))
                .map(specField => specField.Field))

    .includes(dbField["Field Name"])
    });

  console.log(`\nThese results are Required in the Spec but not in the Database:`)
  console.table(specResults, ["Field", "Type"]);
  console.log(`\nThese results are Required in the Database but not in the Spec:`)
  console.table(dbResults, ["Field Name", "Required"]);

}


module.exports.run = checkRequired;