---
title: "Import & Export Data"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-20"
weight: 810
toc: true
---
The `importData` method allows you to import data from external files (e.g., JSON or CSV) into a specified data store.

## Import Syntax

```javascript
jsonverse.importData(dataName, format, filePath);
```

- `dataName` (string): The name or identifier of the data store to which you want to import data.
- `format` (string): The format of the data to be imported ('json' or 'csv').
- `filePath` (string): The path to the external file containing the data to be imported.

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Import data from an external JSON file using promises
const dataName = "exampleData";
const format = "json";
const filePath = "data.json"; // Replace with the path to your JSON file
jsonverse
  .importData(dataName, format, filePath)
  .then(() => {
    console.log("Data imported successfully.");
  })
  .catch((error) => {
    console.error("Error importing data:", error);
  });
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Import data from an external JSON file using a callback function
const dataName = "exampleData";
const format = "json";
const filePath = "data.json"; // Replace with the path to your JSON file
jsonverse.importData(dataName, format, filePath, (error) => {
  if (error) {
    console.error("Error importing data:", error);
  } else {
    console.log("Data imported successfully.");
  }
});
```

The `exportData` method allows you to export data from a specified data store to external files in either JSON or CSV format.

## Export Syntax

```javascript
jsonverse.exportData(dataName, format);
```

- `dataName` (string): The name or identifier of the data store from which you want to export data.
- `format` (string): The format in which to export the data ('json' or 'csv').

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Export data from a specified data store to an external JSON file using promises
const dataName = "exampleData";
const format = "json";
jsonverse
  .exportData(dataName, format)
  .then(() => {
    console.log("Data exported successfully.");
  })
  .catch((error) => {
    console.error("Error exporting data:", error);
  });
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Export data from a specified data store to an external JSON file using a callback function
const dataName = "exampleData";
const format = "json";
jsonverse.exportData(dataName, format, (error) => {
  if (error) {
    console.error("Error exporting data:", error);
  } else {
    console.log("Data exported successfully.");
  }
});
```

These import and export methods provide flexibility in managing data in jsonverse, allowing you to import data from external sources and export data to various formats with and without promises.
