/*eslint-env node*/

// both the spec and database are formatted via their own object 

/* About Match
since .match(regex) returns an array or null, I bypass the array and return the string directly, or null. Throughout this file I use ternary oporators to do this. Otherwise you'd get an error "Cannot read property '0' of null" */
function matchFunction(logic, regex) {
  const match = logic ? logic.match(regex) : null;
  return logic && match ? match[0] : null
}

function getLowRange(logic) {
  // returns the lower value for QV logic
  const regexLess = /(?<=less than )-?\d+,?\d*/g;
  const value = matchFunction(logic, regexLess);
  // removes the comma in the value or returns null if value was already null
  return value ? value.replace(",", "") : null;
}

function getHighRange(logic) {
  const regexGreater = /(?<=greater than )-?\d+,?\d*/g;
  const value = matchFunction(logic, regexGreater);
  // removes the comma in the value or returns null if value was already null
  return value ? value.replace(",", "") : null;
}


class SpecObject {
  constructor(specJSON) {
    this.field = specJSON.Field;
    this.label = specJSON.Description;
    this.type = specJSON.Type;
    this.logic = specJSON.Logic;
    this.message = specJSON.Message !== "n/a" ? specJSON.Message : false;
    this.developed = specJSON.Developed;
    this.required = this.type === "REQ" ? true : false;
    this.lowRange = getLowRange(this.logic);
    this.highRange = getHighRange(this.logic);
  }

}

module.exports.SpecObject = SpecObject;