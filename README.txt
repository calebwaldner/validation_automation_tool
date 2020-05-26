
Process to Prepare File
- Database
  - Downloaded the Data Dictionary in Excel format.
  - Opened file, deleted first row if needed. The first row MUST be the main headers for that column.
  - Saved as CSV
  - Store Database CSV in Data_To_Validate folder and add reference to it in the file_reference.json document.
- Spec
  - Download the spec as a CVS. 
  - Opened file, deleted first row if needed. The first row MUST be the main headers for that column.
  - Store Spec CSV in Data_To_Validate folder and add reference to it in the file_reference.json document.
- Open the terminal and navigate to the "validation_automation_tool" file. 
- Type "node app.js [command]". See commands below to run.

Commands:
  - Run "ra" to Run All > Pass all those tests, then run tests listed in the pass message
  - Run "db" or "spec" to see their respective tables
  - Run "apps" to see a list of all the apps and descriptions (most of these are run in the "ra" command)
  - Each app has it's own command to run it separately, which is listed in the description
 


** ABOUT THE STANDARD FORMAT **

THE SPEC
- Based off ClinicalStudios
Below are the header rows for the spec CSV. These are the defaults from clinical studios, but they've been recorded here. These headers must make up the first row, the header row. They can be in any order.
[
  Field,
  Description,
  Type,
  Logic,
  Message,
  Developed,
  "Logic Review and Supporting Document",
  N/A,
  "Test Case and Method of Validation",
  N/A,
  Result
]


THE DATABASE (AKA DATA DICTIONARY)
- Based off ClinicalStudios
Below are the header rows for the database CSV. These are the defaults from clinical studios, but they've been recorded here. These headers must make up the first row, the header row. They can be in any order.
[
  Field Name,
  Field Label,
  Field ID,
  Max Length,
  Field Type,
  Conditional Actions,
  Required,
  Low Range,
  High Range,
  Choices
]


** KNOWN BUGS **
- When there is error thrown during an "ra" run, the console.log messages that accompany the error might get thrown twice since the Run All function runs each checkpoint twice. Example can be replicated by having the database field have no message but the spec has a message. There is an error set up to catch this but it runs twice in Run All mode. 