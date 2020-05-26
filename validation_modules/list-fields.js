/*eslint-env node*/

// https://www.npmjs.com/package/tty-table
const ttyTable = require("./../node_modules/tty-table");

function listDBFieldNames(dbData) {

  // for the tty-Table
  const options = {
    borderStyle: "solid",
    borderColor: "blue",
    headerAlign: "center",
    align: "left",
    color: "white",
    width: "100%",
    defaultErrorValue: "-",
    errorOnNull: true,
  }
    // for the tty-Table
  let header = [
    {
      value: "field",
      width: 30
    },
    {
      value: "label"
    },
    {
      value: "required",
      width: 32,
      formatter: function (value) {
        let str = value ? "Yes" : "No"
        return (value) ? this.style(str, "green") : 
          this.style(str, "red")
      }
    },
    {
      value: "ca"
    },
    {
      value: "logicLabelField",
      width: 30
    },
    {
      value: "type",
      width: 30
    },
    {
      value: "message"
    },
    {
      value: "lowRange",
      width: 32
    },
    {
      value: "highRange",
      width: 32
    }
  ]

  let tTable = ttyTable(header, dbData, options).render();
  console.log(tTable);

  
}

module.exports.listDB = listDBFieldNames;



function listSpecFieldNames(specData) {

  // for the tty-Table
  const options = {
    borderStyle: "solid",
    borderColor: "blue",
    headerAlign: "center",
    align: "left",
    color: "white",
    width: "100%",
    defaultErrorValue: "-",
    errorOnNull: true,
  }
    // for the tty-Table
  let header = [
    {
      value: "field",
      width: 30
    },
    {
      value: "label"
    },
    {
      value: "required",
      width: 32,
      formatter: function (value) {
        let str = value ? "Yes" : "No"
        return (value) ? this.style(str, "green") : 
          this.style(str, "red")
      }
    },
    {
      value: "logic"
    },
    {
      value: "type",
      width: 30
    },
    {
      value: "message"
    },
    {
      value: "lowRange",
      width: 20,
      alias: "Low Range"
    },
    {
      value: "highRange",
      width: 20,
      alias: "High Range"
    }
  ]

  let tTable = ttyTable(header, specData, options).render();
  console.log(tTable);


}

module.exports.listSpec = listSpecFieldNames;