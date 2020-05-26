/*eslint-env node*/

/* 
dependencies:
- Column Header Check
- Logic Label Check (matchFieldNamesLabelNames)
  - depends on logic labels to run properly

*/


function checkMessages(dbData, specData, args = [], isCheckpoint = false) {
  const argsArr = [...args];

  const results = [];

  specData
    .filter(field => field.message)
    .forEach(field => {

    // filter the dbFields to the matching spec field name and field type
    const dbMatchingFieldArr = dbData
      .filter(dbField => {return field.field === dbField.field && field.type === dbField.type});

    // if there are two matching fields, this throws an arror as this should never happen.
    if (dbMatchingFieldArr.length > 1) {
      console.log("The Spec:", field);
      console.log("The Database:", dbMatchingFieldArr);
      throw Error("Two fields from the database have the same field name and type, investigate this.");
    }

    // this filters out the 0 results.
    let dbMatching; 
    // dbMatchingFieldArr var is an object or blank array
    if (dbMatchingFieldArr.length > 0) {
      dbMatching = dbMatchingFieldArr[0];

      // if the spec has a message but the database has no message, this can happen. Error is thrown if this happens.
      if (dbMatching.message === null) {
        console.log(field);
        console.log(dbMatching);
        throw new Error("Spec field has a message but the database field shows no message.");
      }

      // this gets the messages without the double (or triple) spaces between the words, which is very common but not something that merits a missmatch. 
      const dbFieldFormated = dbMatching.message.replace(/\.\s\s?\s?/, ". ");
      const specFieldFormated = field.message.replace(/\.\s\s?\s?/, ". ");

      // pushes all these fields to the results array if the two messages do not match.
      if (specFieldFormated !== dbFieldFormated) {
        results.push(new Array("From Spec =>", field.field, field.type, field.message, dbMatching.message, dbMatching.type, dbMatching.field, "<= From Database"));
      }
    }
  })

  // console.log(results);


  //////////// HANDEL ARGUMENTS ////////////
  if (argsArr.includes("null")) {
    console.log(`\n************** NULL CA **************\n`);
    console.log(dbData.filter(field => field.ca.null));
  }

  if (argsArr.includes("count")) {
    console.log(`\n************** COUNTER **************\n`);
    // console.log(counter);
  }


  //////////// RESULTS ////////////

  // if there are results (results array greater than 0), 
  if (results.length > 0) {
    // if in checkpoint mode, throw an error if this test didn't pass the checkpoint.
    if (isCheckpoint) {throw Error("A problem with matching messages")}

    // results, not in checkpoint mode
    // spec results
    console.log(`\nThese results have different messages:`);
    console.table(results);
  } else {
    // results for checkpoint mode
    if (isCheckpoint) {
      return true
    } 

    // not in checkpoint mode
    console.log(`There are no results!`); // not in checkpoint mode
  }
}



module.exports.run = checkMessages;