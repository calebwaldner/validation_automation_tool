/*eslint-env node*/

// both the spec and database are formatted via their own object

/* About Match
since .match(regex) returns an array or null, I bypass the array and return the string directly, or null. Throughout this file I use ternary oporators to do this. Otherwise you'd get an error "Cannot read property '0' of null" */
function matchFunction(ca, regex) {
  const match = ca ? ca.match(regex) : null;
  return ca && match ? match[0] : null
}

function getType(ca) {
  const regexType = /(?<=_)(NOTE|REQ|BLANK|CLEAR|COMP|DISABLE|FUTURE|HIDE|IC|MC|NOTE|NOTIFY|POP|SF|QV|TAB)\d?/g;
  return matchFunction(ca, regexType)
}

function getMessage(ca) {
  const regexMessage = /(?<=Edit Check Message: ).*/g;
  return matchFunction(ca, regexMessage)
}

function getLowRange(ca) {
  const regexDBLow = /(?<=\[.+\] < ')\d+\.?\d*/;
  return matchFunction(ca, regexDBLow)
}

function getHighRange(ca) {
  const regexDBLow = /(?<=\[.+\] > ')\d+\.?\d*/;
  return matchFunction(ca, regexDBLow)
}

function getLogicLabelField(ca) {
  const regexFirstFieldName = /(?<=(.* - ))\w*(?=_)/g;
  return matchFunction(ca, regexFirstFieldName)
}

class DBObject {
  
  // takes an individual conditional action logic block. Each CA will need to be passed in individually to this object
  constructor(dbJSON, conAction) {
    this.field = dbJSON["Field Name"];
    this.label = dbJSON["Field Label"];
    this.fieldID = dbJSON["Field ID"];
    this.maxLength = dbJSON["Max Length"];
    this.fieldType = dbJSON["Field Type"];
    this.choices = dbJSON.Choices;
    this.required = dbJSON.Required === "Yes" ? true : false;
    this.dbLowRange = dbJSON["Low Range"];
    this.dbHighRange = dbJSON["High Range"];
    this.ca = conAction.length>0 ? conAction : null; //the entire condional action block, all properties following depend on this
    this.type = getType(this.ca);
    this.logicLabelField = getLogicLabelField(this.ca);
    this.message = getMessage(this.ca);
    this.lowRange = getLowRange(this.ca); 
    this.highRange = getHighRange(this.ca); 
  }

  /**
   * Finds discrepancies between the field name and logic label. 
   * @returns {object} this object
  */
  checkLogicLabelField() {
    
    if (this.field !== this.logicLabelField) { 
      return this
    } else {
      return false;
    }

  }
}

module.exports.DBObject = DBObject;