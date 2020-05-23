/*eslint-env node*/

function listDBFieldNames(dbData, argsArr) {

  //TODO make all these lists of arguments come from the library database.

  // console.log(`You can add one of these as an argument:\n"Field Name", "Field Label", "Field ID", "Max Length", "Field Type", "Conditional Actions", "Required", "Low Range", "High Range", "Choices"`);
  // console.table(dbData, ["Field Name", ...argsArr]);
  // console.log(`You can add one of these as an argument:\n"Field Name", "Field Label", "Field ID", "Max Length", "Field Type", "Conditional Actions", "Required", "Low Range", "High Range", "Choices"`);

  ///// testing
  

  console.log(dbData);

}

module.exports.listDB = listDBFieldNames;



function listSpecFieldNames(specData, argsArr) {

  // console.log(`You can add one of these as an argument:\n"Field", "Description", "Type", "Logic", "Message", "Developed", "Logic Review and Supporting Document", "N/A", "Test Case and Method of Validation", "N/A", "Result"`);
  // console.table(specData, ["Field", ...argsArr]);
  // console.log(`You can add one of these as an argument:\n"Field", "Description", "Type", "Logic", "Message", "Developed", "Logic Review and Supporting Document", "N/A", "Test Case and Method of Validation", "N/A", "Result"`);

  ///// testing
  

  console.log(specData);

}

module.exports.listSpec = listSpecFieldNames;