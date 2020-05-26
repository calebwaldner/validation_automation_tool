// For ESLint
/*eslint-env node*/

// List of all expected logic types in a regex expression
const matchingPattern = /((NOTE)|(REQ)|(BLANK)|(CLEAR)|(COMP)|(DISABLE)|(FUTURE)|(HIDE)|(IC)|(MC)|(NOTE)|(NOTIFY)|(POP)|(SF)|(QV)|(TAB))(\s\d)?$/gm;

function checkSpecLogicType(specData, isCheckpoint = false) {
  
  const results = specData
    // return if the field type is not included in the expectedLogicTypes
    .filter(field => !field.type.match(matchingPattern))


  //// RESULTS 

  // if there are results (results array greater than 0), 
  if (results.length > 0) {
    // if in checkpoint mode, throw an error if this test didn't pass the checkpoint.
    if (isCheckpoint) {throw Error("A spec field type isn't correct")}

    // results, not in checkpoint mode
    console.log(`\nThese spec fields have types that are not recognized:`);
    console.table(results, ["field", "type"])

  } else {
    // results for checkpoint mode
    if (isCheckpoint) {return true} 

    // not in checkpoint mode
    console.log(`There are no results!`); // not in checkpoint mode
  }
}

module.exports.run = checkSpecLogicType;
