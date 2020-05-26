// About the "Standard Format". This is the format that all data will be formatted to. All functions will be built based off this standard JSON format.

// For ESLint
/*eslint-env node*/


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
 * MODULES
***************************************************/

const SpecObjectMod = require("./SpecObject.js");
const SpecObject = SpecObjectMod.SpecObject; // sets the prototype to this constant
const DBObjectMod = require("./DBObject.js");
const DBObject = DBObjectMod.DBObject;// sets the prototype to this constant

const matchFieldLogicLabel = require("./validation_modules/match_field_name_label_name");

const matchSpecNamesAndDBNames = require("./validation_modules/check_spec_db_field_names");

const checkSpecColumnHeaders = require("./validation_modules/check_spec_column_headers");

const listFields = require("./validation_modules/list-fields");

const checkSpecLogicType = require("./validation_modules/check_spec_logic_type");

const checkRequired = require("./validation_modules/check_required");

const getQV = require("./validation_modules/get_QV");

const checkMessages = require("./validation_modules/check_messages");



/***************************************************
 * Library
***************************************************/

// 3 spots require an update to add a new module: the libraryDatabase, the method list for the Library class, and the VALIDATION MODULES section.

// TODO: Use this database to dynamically call everything needed for this app. Try to make this the only place things need to be edited. Maybe don't need to dynamically call everything, but at least use string interpolation so changes are only needed in the library_database.
const libraryDatabase = [
  {
    name: "matchFieldLogicLabel",
    dependencies: [],
    file: "match_field_name_label_name.js",
    description: "Shows a list of fields that have problems with their logic label field names",
    command_line_arguments: []
  },
  {
    name: "matchSpecNamesAndDBNames",
    dependencies: ["checkSpecColumnHeaders"],
    file: "check_spec_db_field_names.js",
    description: "Returns a list of field names that should find matches but do not between the spec and the database.",
    command_line_arguments: []
  },
  {
    name: "db",
    file: "list-fields.js",
    description: "Returns at tabel of the database",
    command_line_arguments: []
  },
  {
    name: "spec",
    file: "list-fields.js",
    description: "Returns at tabel of the spec",
    command_line_arguments: []
  },
  {
    name: "checkSpecLogicType",
    dependencies: ["checkSpecColumnHeaders"],
    file: "check_spec_logic_type.js",
    description: "Checks for Spec accuracy. Checks the 'Type' column on the spec that the type values are accurate",
    command_line_arguments: [],
  },
  {
    name: "checkRequired",
    dependencies: ["checkSpecColumnHeaders", "checkSpecLogicType", "matchSpecNamesAndDBNames"],
    file: "check_required.js",
    description: "Checks that all fields that are required in the spec are also required in the database. ",
    command_line_arguments: [],
    returns: ""
  },
  {
    name: "getQVRange",
    dependencies: ["checkSpecColumnHeaders", "checkSpecLogicType", "matchSpecNamesAndDBNames"],
    file: "get_QV.js",
    description: "Gets the less/greater than values for each field when applicable. Also checks that those values match the database. Returns a CSV list of the field name, low value, and high value.",
    command_line_arguments: [],
    returns: ""
  },
  {
    name: "checkMessages",
    dependencies: ["checkSpecColumnHeaders", "checkSpecLogicType", "matchSpecNamesAndDBNames"],
    file: "check_messages.js",
    description: "Checks that messages match between the spec and the database",
    command_line_arguments: ["null"],
    returns: ""
  }
]

// constructor takes the standard format JSON data
class Library {
  constructor(dbData, specData, args) {
    this.databaseData = dbData;
    this.specData = specData;
    this.arguments = args;
  }

  // For viewing the library database
  apps() {
    console.log(libraryDatabase);
  }

  // Below are all the different validation functions. They are called out of the library object dynamically and should be given the correct arguments depending on what the functions require.

  matchFieldLogicLabel(isCheckpoint) {
    matchFieldLogicLabel.run(this.databaseData, isCheckpoint);
  }

  matchSpecNamesAndDBNames(isCheckpoint) {
    matchSpecNamesAndDBNames.run(this.databaseData, this.specData, isCheckpoint);
  }

  db() {
    listFields.listDB(this.databaseData, this.arguments);
  }

  spec() {
    listFields.listSpec(this.specData, this.arguments);
  }

  checkSpecLogicType(isCheckpoint) {
    checkSpecLogicType.run(this.specData, isCheckpoint);
  }

  checkRequired(isCheckpoint) {
    checkRequired.run(this.databaseData, this.specData, isCheckpoint);
  }

  getQV() {
    getQV.run(this.databaseData, this.specData, this.arguments);
  }

  checkMessages(isCheckpoint) {
    checkMessages.run(this.databaseData, this.specData, this.arguments, isCheckpoint);
  }

  // Checkpoints
  ra() {runAll(this)}
}


/***************************************************
 * Processing Command Line
***************************************************/

const csvFilePathDB = databaseDataCSV("db");
const csvFilePathSpec = databaseDataCSV("spec");
const csv = require('./node_modules/csvtojson');

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

    // Runs a check on the spec column headers first, and if there is a problem the library function will not run
    try { checkSpecColumnHeaders.run(specJSON);
      
      //// TESTING JSON DATA ////
        // console.log(dbJSON) // for testing
        // console.log(specJSON) // for testing

      /************************* JSON SCOPE **************************
      * In this scope both the Database and Spec CSV files have been transferer to JSON.
      * Because the csvtojson module returns a promise, we must call all validation modules within the promise
      * Edit: I believe this could be altered to use the "done" event, which would fire once all data is in. Then I could use a global variable to capture the data\ and on the 'done' event do everything else */

      // Gets the command line arguments
      const commandLineArguments = process.argv.splice(2);

      // instantiates SpecObject and DatabaseObject
      const dbData = normalizeDBData(dbJSON);
      const specData = normalizeSpecData(specJSON);

      // instantiation of the library, which is used to dynamically call all the functions
      const library = new Library(dbData, specData, commandLineArguments.splice(1));

    
      // Tries to run the commend like argument as a method. If it matches one of the methods in the library object, then it will run. If not there is a custom error message thrown.
      try {
        library[commandLineArguments[0]](); // dynamically calls a method of the library object based off the first command line argument
      } catch(error) {
        if (error.message === "Cannot read property 'forEach' of undefined") {return} // this is the error message from a problem with the files. There are other error messages for that.
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
 * Data Normalize Functions
***************************************************/

function normalizeSpecData(specJSON) {
  const specArr = [];
  specJSON.forEach(row => specArr.push(new SpecObject(row)));
  return specArr;
}

function normalizeDBData(dbJSON) {
  const dbArr = [];
  const regexLineSplit = /\n\s*\n/g; // used to split the condional actions appart

  dbJSON.filter(row => {
    // these things filter the rows so blank rows and rows that are not fields get filtered
    if (
      row["Field ID"].length > 0 
      &&
      // this happens from a normalized embeded log
      row["Field Name"] !== 'Field Name'
    ) {return true}
    })
    .forEach(row => {
      //returns array of conditional actions
      const casArr = row["Conditional Actions"].split(regexLineSplit); 
      casArr.forEach(ca => {
        dbArr.push(new DBObject(row, ca));
      });
  })
  return dbArr;
}


/***************************************************
 * Checkpoints
***************************************************/

// Checkpoints are groups of functions that run in a row, making it quicker to validate. Each checkpoint should provide feedback on each test, pass or fail. Apps that are in checkpoint mode simply return a boolean respective of the results. That boolean triggers the checkpoint to either pass to the next test or stop and show the results of a failed test. 

// Dependancies are apps that the main app is depending on. Dependancies should be tested in an if/else statment in checkpoint mode before running the main app

function handelCheckpoint(library, app, testDiscription, isCheckpoint = true) {
  try {
    library[app](isCheckpoint);
    console.log(`\n${testDiscription}: Pass\n`);
  } catch(error) {
    console.log(`\n${testDiscription}: Fail`);
    library[app]() // same function but not in checkpoint mode, to provide the results.
    throw new Error();
  }
  console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`)
}

function runAll(library) {

  // try/catch used to stop this progression once one of the test fails.
  try {
    handelCheckpoint(library, "checkSpecLogicType", `Spec field type test`);

    //// Match Spec Names and Database Names
    handelCheckpoint(library, "matchSpecNamesAndDBNames", `Database field and spec fields match test`);

    //// Match Database Fields and Logic Labels
    handelCheckpoint(library, "matchFieldLogicLabel", `Database field and logic label match test`);

    //// Check Requireds
    handelCheckpoint(library, "checkRequired", `Check required logic`);

    //// Check Messages
    handelCheckpoint(library, "checkMessages", `Check messages matching`)

    //// When Run All Completes
    console.log(`\nAll Tests Complete\n\nOther apps you can run:\n| getQVRange | \n`)
    

  } catch(error) {
    console.log(error.message);
    console.log(`Process terminated. Correct the error and run again.`);
  }
}