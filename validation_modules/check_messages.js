/* 
dependencies:
- Column Header Check
- Logic Label Check (matchFieldNamesLabelNames)
  - depends on logic labels to run properly

*/

const regexLineSplit = /\n\s*\n/g;
const regexGetMessage = /(?<=Edit Check Message: ).*/g;
const matchingPattern = /(?<=_)(NOTE|REQ|BLANK|CLEAR|COMP|DISABLE|FUTURE|HIDE|IC|MC|NOTE|NOTIFY|POP|SF|QV|TAB)(\d+)?/g;

let counter=0; // for testing

function checkMessages(dbData, specData, args) {
  // gets arguments into their own array
  const argsArr = [...args];

  const specInfo = getSpecInfo(specData);
  const dbInfo = getDBInfo(dbData);

  console.table(dbInfo);
  // console.table(specInfo);
  /*eslint-env node*/


  //////////// HANDEL ARGUMENTS ////////////

  if (argsArr.includes("null")) {
    console.log(`\n************** NULL CA **************\n`);
    console.log(dbArr.filter(field => field.conditionalActions.null));
  }; 

  if (argsArr.includes("count")) {
    console.log(`\n************** COUNTER **************\n`);
    console.log(counter);
  }; 
}

// returns an object containing the database info
function getDBInfo(dbData) {
  const dbArr = [];
  dbData.forEach(dbField => {
    // makes an object that will hold the db info
    const dbInfo = {}
    // gets conditional actions from the field into an array
    const casArr = dbField["Conditional Actions"].split(regexLineSplit);

    // loops through conditional action array to get data
    casArr.forEach(ca => {
      // console.log(ca); // For testing
      // console.log(`+++++++++++++++++++++++++`) // For testing
      // get the logic field, type, and message
      dbInfo.field = dbField["Field Name"];
      dbInfo.type = ca.match(matchingPattern);
      dbInfo.message = ca.match(regexGetMessage);
      console.log(dbInfo.field, dbInfo.type, dbInfo.message); // I THINK THIS IS HAPPENING BECAUSE I'M USING PROPERTIES TO STOR THE DATA. PROBABLY SHOULD SWITCH TO STRINGS OR ARRAY OR SOMETHING. 
      // if (dbInfo.type) {
      //   dbArr.push(dbInfo);
      // };
      dbArr.push(dbInfo);
    });
  });
  return dbArr;
}

function getSpecInfo(specData) {
  const specArr = [];
  specData.forEach(specData => {

  });
}

module.exports.run = checkMessages;