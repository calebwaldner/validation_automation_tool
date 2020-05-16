

Process so far:
Prepare file
⁃ Downloaded the Data Dictionary in Excel format.
⁃ Opened file, deleted first row if needed. The first row MUST be the main headers for that column.
⁃ Saved as CSV
- Store CSV in Data_To_Validate folder and add reference to it in the file_reference.json document.


** VALIDATION TOOLS **

Here is a list of each validation tool, as well as a brief discription and user instructions.

Compaire DB Field Names with Lable Names
- Argument: matchFeldNamesLabelNames
- Files used: DB only
- Discription: Compaires the field name within the field name column to the field name within the logic lable. 
- Notes: It's possible the "Field #" portion of results may be off, these are for reference to try to help the user find the field quickly.


** STANDARD FORMAT **

THE SPEC
- Based off ClinicalStudios
Below are the header rows for the spec CSV. These are the defults from clenical studios, but they've been recorded here. These headers must make up the first row, the header row. They can be in any order.
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
Below are the header rows for the database CSV. These are the defults from clenical studios, but they've been recorded here. These headers must make up the first row, the header row. They can be in any order.
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