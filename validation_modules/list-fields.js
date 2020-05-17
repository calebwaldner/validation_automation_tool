

function listDBFieldNames(dbFields, argsArr) {

  console.log(`You can add one of these as an argument:\n"Field Name", "Field Label", "Field ID", "Max Length", "Field Type", "Conditional Actions", Required, "Low Range", "High Range", Choices`);
  console.table(dbFields, ["Field Name", ...argsArr]);
  console.log(`You can add one of these as an argument:\n"Field Name", "Field Label", "Field ID", "Max Length", "Field Type", "Conditional Actions", Required, "Low Range", "High Range", Choices`);

}

module.exports.listDB = listDBFieldNames;



function listSpecFieldNames(specFields, argsArr) {

  console.log(`You can add one of these as an argument:\n"Field", "Description", "Type", "Logic", "Message", "Developed", "Logic Review and Supporting Document", "N/A", "Test Case and Method of Validation", "N/A", "Result"`);
  console.table(specFields, ["Field", ...argsArr]);
  console.log(`You can add one of these as an argument:\n"Field", "Description", "Type", "Logic", "Message", "Developed", "Logic Review and Supporting Document", "N/A", "Test Case and Method of Validation", "N/A", "Result"`);

}

module.exports.listSpec = listSpecFieldNames;