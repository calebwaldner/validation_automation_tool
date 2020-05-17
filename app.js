// About the "Standar Format". This is the format that all data will be formated to. All functions will be built based off this standard JSON format.


/***************************************************
 * FORM CSV FILE REFERENCE 
 ***************************************************/

// These are references to the titles of folders and files. If one of the folder or files change, just change the name here.
const fileHoldingData = `Data_To_Validate`;
const fileReferenceJSON = `file_reference.json`;
// This is the request and path to the JSON file that has the user provided data.
const dataReference = require(`./../${fileHoldingData}/${fileReferenceJSON}`);


// used when the is a problem between the fileHoldingData and fileReferenceJSON.
const fileNotFoundMessage = (error, file) => {
  if (error.message === "File does not exist. Check to make sure the file path to your csv is correct.") {
    console.log(`********************\nFile Not Found\nCannot find a file in the ${fileHoldingData} folder with the name ${file}.\nPlease double check that the .csv file name in the ${fileHoldingData} folder and the file name in the ${fileReferenceJSON} JSON file match.\n********************`);
  }
};

// Sends the correct path, depending on the parameter
const databaseDataCSV = type => {
  if (type === "db") {
    return `./../${fileHoldingData}/${dataReference.database_data_csv_file}`;
  } else if (type === "spec") {
    return `./../${fileHoldingData}/${dataReference.spec_data_csv_file}`;
  }
}


/***************************************************
 * VALIDATION MODULES
***************************************************/

const matchFeldNamesLabelNames = require("./validation_modules/match_field_name_label_name");

const matchSpecFieldNamesAndLabelNames = require("./validation_modules/check_spec_db_field_names");

const checkSpecColumnHeaders = require("./validation_modules/check_spec_column_headers");

const listFields = require("./validation_modules/list-fields");



/***************************************************
 * Library
***************************************************/

// constructor takes the standard format JSON data
class Library {
  constructor(databaseData, specData, args) {
    this.databaseData = databaseData;
    this.specData = specData;
    this.arguments = args;
  }

  // Below are all the different validation functions. They are called out of the library object dynamically and should be given the correct arguments depending on what the functions require.

  checkSpecColumnHeaders() {
    checkSpecColumnHeaders.run(this.specData);
  }

  matchFeldNamesLabelNames() {
    matchFeldNamesLabelNames.run(this.databaseData);
  }

  matchSpecFieldNamesAndLabelNames() {
    matchSpecFieldNamesAndLabelNames.run(this.databaseData, this.specData);
  }

  listDBFields() {
    listFields.listDB(this.databaseData, this.arguments);
  }

  listSpecFields() {
    listFields.listSpec(this.specData, this.arguments);
  }
  

}


/***************************************************
 * Processing Command Line
***************************************************/

const csvFilePathDB = databaseDataCSV("db");
const csvFilePathSpec = databaseDataCSV("spec");
const csv = require('./.gitignore/node_modules/csvtojson');

// gets db csv file and returns a promise of JSON data
csv() // Part of csvtojson module
.on('error',(err)=>{
  fileNotFoundMessage(err, dataReference.database_data_csv_file); //custom error message for miss matched files
})
.fromFile(csvFilePathDB) // Part of csvtojson module
.then((dbJSON) => { // Part of csvtojson module
    
  // gets spec csv file and returns a promise of JSON data  
  csv() // Part of csvtojson module
  .on('error',(err)=>{
    fileNotFoundMessage(err, dataReference.spec_data_csv_file); //custom error message for miss matched files
  })
  .fromFile(csvFilePathSpec) // Part of csvtojson module
  .then((specJSON) => { // Part of csvtojson module

    /************************* JSON SCOPE **************************
    * In this scope both the Database and Spec CSV files have been transfered to JSON.
    * Because the csvtojson module returns a promise, we must call all validation modules within the promise
    * Edit: I believe this could be altered to use the "done" event, which would fire once all data is in. Then I could use a global variable to capture the data\ and on the 'done' event do everything else */

    // Gets the command line arguments
    const commandLineArguments = process.argv.splice(2);
    // console.log(commandLineArguments) // for testing

    // instantiation of the library, which is used to dynamically call all the functions
    const library = new Library(dbJSON, specJSON, commandLineArguments.splice(1));


    // Runs a check on the spec column headers first, and if there is a problem the library function will not run
    try {
      library.checkSpecColumnHeaders(specJSON)
    
      // Tries to run the commend like argument as a method. If it matches one of the methods in the library object, then it will run. If not there is a custom error messege thrown.
      try {
        library[commandLineArguments[0]](); // dynamically calls a method of the library object based off the first command line argument
      } catch(error) {
        if (error.message === "Cannot read property 'forEach' of undefined") {return}; // this is the error message from a problem with the files. There are other error messages for that.
        console.log("error-code:1- ", error.message);
      }

    } 
    catch(error) {
      console.log(error.message)
    }

    
    // TESTING AREA START






    // TESTING AREA END

  })
  .catch(error => {
    console.log("error-code:2- ", `Error Message: ${error.message}`);
  });
})
.catch(error => {
  console.log("error-code:3- ", `Error Message: ${error.message}`);
});



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