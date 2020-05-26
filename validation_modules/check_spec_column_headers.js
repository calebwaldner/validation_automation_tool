// For ESLint
/*eslint-env node*/

// The goal of this module is to check that the spec headers are pefectly accurate agains the "standard format"
// This function is run every time the spec data is used
// This function should return an error if there is a problem so any future functions are stopped. If there are not problems, this function returns nothing.

// This standard format comes from ClenicalStudios and is for the spec data specifically. Currently, the spec template containes these header names, so using this format across the apps is acceptable.
const standardFormatSpec = 
[
  "Field",
  "Description",
  "Type",
  "Logic",
  "Message",
  "Developed",
  "Logic Review and\nSupporting Document",
  "N/A",
  "Test Case and\nMethod of Validation",
  "N/A",
  "Result"
]


/**
 * Checks that all the headers of the spec match the standard format.
 * @param {json} specData 
 */
function checkSpecColumnHeaders(specData) {

  // This uses the keys() method of the Object prototype to make an array of all the property keys from specData[0] row. Only one spec row needs to be checked becasue each other spec row will have exact keys.
  const headers = Object.keys(specData[0]);

  headers.forEach(header => {
    if (!standardFormatSpec.includes(header)) {
      console.log(headers);
      throw new Error('Problem with spec headers'); 
    }
  });
}


// Export
module.exports.run = checkSpecColumnHeaders;