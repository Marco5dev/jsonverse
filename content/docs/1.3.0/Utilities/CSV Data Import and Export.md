---
title: "CSV Data Import and Export"
description: ""
summary: ""
date: 2023-09-18T15:19:28+03:00
lastmod: 2023-09-18T15:19:28+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "CSV Data Import and Export-91274486d23995238d9e05c79309bbfc"
weight: 410
toc: true
---

Jsonverse allows you to easily import and export data in CSV (Comma-Separated Values) format. CSV is a widely used format for tabular data and is compatible with various spreadsheet applications and databases.

## Exporting Data to CSV

To export data from a Jsonverse data collection to a CSV file, you can use the following code:

```js
const jsonverse = require("jsonverse");

// Specify the name of the data collection
const dataCollectionName = "yourDataCollection";

// Specify the path for the CSV file
const csvFilePath = "./exports/data.csv";

// Export data to CSV
jsonverse.exportData(dataCollectionName, "csv", csvFilePath);
```

Replace "yourDataCollection" with the name of the data collection you want to export and specify the desired path in the "csvFilePath" variable. The `jsonverse.exportData(dataCollectionName, "csv", csvFilePath)` method will export the data to a CSV file at the specified location.

## Importing Data from CSV

To import data from a CSV file into a Jsonverse data collection, you can use the following code:

```js
const jsonverse = require("jsonverse");

// Specify the name of the data collection
const dataCollectionName = "yourDataCollection";

// Specify the path to the CSV file
const csvFilePath = "./data/data.csv";

// Import data from CSV
jsonverse.importData(dataCollectionName, "csv", csvFilePath);
```

Replace "yourDataCollection" with the name of the data collection you want to import into and specify the path to the CSV file in the "csvFilePath" variable. The `jsonverse.importData(dataCollectionName, "csv", csvFilePath)` method will read the CSV file and add its contents to the specified data collection.

By using these import and export methods, you can easily transfer data between Jsonverse and other applications that support CSV files. This makes it convenient to work with data in a format that is widely accepted and easily manipulated.
