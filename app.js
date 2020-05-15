// About the "Standar Format". This is the format that all data will be formated to. All functions will be built based off this standard JSON format.


/***************************************************
 * FORM JSON FILE REFERENCE 
 * 
 * Place the form data JSON file reference below
*/

// These are references to the titles of folders and files. If one of the folder or files change, just change the name here.
const fileHoldingData = `Data_To_Validate`;
const fileReferenceJSON = `file_reference.json`;
// This is the request and path to the JSON file that has the user provided data.
const dataReference = require(`./../${fileHoldingData}/${fileReferenceJSON}`);


// used when the is a problem between the fileHoldingData and fileReferenceJSON.
const fileNotFoundMessage = file => console.log(`File Not Found
Cannot find a file in the ${fileHoldingData} folder with the name ${file}. Please double check that the .csv file name in the ${fileHoldingData} folder and the file name in the ${fileReferenceJSON} JSON file match.`);

// use to set up auto CSV
// const dataDatabaseCSV =  
// const dataSpecCSV = 


const databaseDataJSON = type => {
  if (type === "db") {
    try {
      return require(`./../${fileHoldingData}/${dataReference.database_data_csv_file}`);
    } catch(error) {fileNotFoundMessage(dataReference.database_data_csv_file)}
  } else if (type === "spec") {
    try {
      return require(`./../${fileHoldingData}/${dataReference.spec_data_csv_file}`);
    } catch(error) {fileNotFoundMessage(dataReference.spec_data_csv_file)}
  }
}

/***************************************************/


/***************************************************
 * VALIDATION DEPENDENT MODULES
***************************************************/

const matchFeldNamesLabelNames = require("./validation_modules/match_field_name_label_name");



/***************************************************
 * Library
***************************************************/

// constructor takes the standard format JSON data
class Library {
  constructor(databaseData, specData) {
    this.databaseData = databaseData;
    this.specData = specData;
  }

  // Below are all the different validation functions. They are called out of the library object dynamically and should be given the correct arguments depending on what the functions require.

  matchFeldNamesLabelNames() {
    matchFeldNamesLabelNames.run(this.databaseData)
  }

}

// instantiation of the library, which is used to dynamically call all the functions
const library = new Library(databaseDataJSON("db"), databaseDataJSON("spec"));


/***************************************************
 * Processing Command Line
***************************************************/



const commandLineArgument = process.argv.splice(2);
try {
  library[commandLineArgument](); // dynamically calls a method of the library object
} catch(error) {
  if (error.message === "Cannot read property 'forEach' of undefined") {return}; // this is the error message from a problem with the files. There are other error messages for that.
  console.log("Not a function in the validation library")
}


/***************************************************
 * Required
***************************************************/

// const allRequired = formJSON.filter(field => field["Required"]);




/***************************************************
 * Other
***************************************************/

// example of getting one field
// const oth_x = formJSON.find(field => field["Field Name"] === "OTH_X"); 

/* data for example
{
  'Field Name': 'OTH_X',
  'Field Label': 'Review of Systems - Other - Specify',
  'Field ID': 217,
  'Max Length': 200,
  'Field Type': 'text',
  'Conditional Actions': 'Validate Field (Edit Check) - OTH_X_QV\n' +
    'if ([OTH] IS NOT BLANK and [OTH_X] IS BLANK)\n' +
    "Edit Check Message: Please specify a category for 'Other'",
  Required: 'No',
  'Low Range': '',
  'High Range': '',
  Choices: ''
}
*/