

// List of all expected logic types in a regex expression
const matchingPattern = /((NOTE)|(REQ)|(BLANK)|(CLEAR)|(COMP)|(DISABLE)|(FUTURE)|(HIDE)|(IC)|(MC)|(NOTE)|(NOTIFY)|(POP)|(SF)|(QV)|(TAB))(\s\d)?$/gm;

function checkSpecLogicType(specData) {
  
  let results = specData
    // return if the field type is not included in the expectedLogicTypes
    .filter(field => !field.Type.match(matchingPattern))

  console.table(results, ["Field", "Type"]);
}

module.exports.run = checkSpecLogicType;
