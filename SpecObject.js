
// both the spec and database are formatted via their own object 

class SpecObject {
  constructor(specJSON) {
    this.field = specJSON.Field;
    this.label = specJSON.Description;
    this.type = specJSON.Type;
    this.logic = specJSON.Logic;
    this.message = specJSON.Message;
  }

  get required() {
    // return boolean 
  }

  get lowRange() {
    // returns the lower value for QV logic
  }

  get highRange() {
    // returns the greater value for QV logic
  }

  get developed() {
    // use specJSON.Developed and return boolean
  }

  ls(args) {

  }

}

module.exports.SpecObject = SpecObject;