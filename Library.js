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

// This is how you export a class
module.exports = {
  Library: Library
}