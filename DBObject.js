
// both the spec and database are formatted via their own object

class DBObject {
  
  // takes an individual conditional action logic block. Each CA will need to be passed in individually to this object
  constructor(dbJSON, conAction) {
    this.field = dbJSON["Field Name"];
    this.label = dbJSON["Field Label"];
    this.fieldID = dbJSON["Field ID"];
    this.maxLength = dbJSON["Max Length"];
    this.fieldType = dbJSON["Field Type"];
    this.choices = dbJSON.Choices;
    this.ca = conAction; //the entire condional action block
  }

  // get required() {
  //   // return boolean 
  // }

  // get lowRange() {
  //   // returns either "Low Range" from the db file, or the lower value for QV logic
  // }

  // get highRange() {
  //   // returns either "High Range" from the db file, or the lower value for QV logic
  // }

  // get message() {
    
  // }
}

module.exports.DBObject = DBObject;