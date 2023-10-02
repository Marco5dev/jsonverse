---
title: "Importing Data"
description: "You can import data into the jsonverse database from external files in JSON or CSV formats. Here's how you can import data:"
summary: "You can import data into the jsonverse database from external files in JSON or CSV formats. Here's how you can import data:"
date: 2023-09-18T14:49:06+03:00
lastmod: 2023-09-18T14:49:06+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Importing Data-47f1f9a3919831efb73b68bd8125ca18"
weight: 270
toc: true
---

You can import data into the jsonverse database from external files in JSON or CSV formats. Here's how you can import data:

## 1. **Import from JSON:**

   To import data from a JSON file, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Specify the format as "json"
   const format = "json";

   // Replace "path/to/your/data.json" with the actual path to your JSON file
   const filePath = "path/to/your/data.json";

   jsonverse.importData(dataName, format, filePath)
     .then(() => {
       console.log(`Data imported from ${filePath} to ${dataName}`);
     })
     .catch((error) => {
       console.error("Error importing data:", error);
     });
   ```

   This code will import data from the specified JSON file into your data.

## 2. **Import from CSV:**

   To import data from a CSV file, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Specify the format as "csv"
   const format = "csv";

   // Replace "path/to/your/data.csv" with the actual path to your CSV file
   const filePath = "path/to/your/data.csv";

   jsonverse.importData(dataName, format, filePath)
     .then(() => {
       console.log(`Data imported from ${filePath} to ${dataName}`);
     })
     .catch((error) => {
       console.error("Error importing data:", error);
     });
   ```

   This code will import data from the specified CSV file into your data.

## 3. **Import from XLSX:**

   To import data from a XLSX file, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Specify the format as "XLSX"
   const format = "xlsx";

   // Replace "path/to/your/data.xlsx" with the actual path to your XLSX file
   const filePath = "path/to/your/data.xlsx";

   jsonverse.importData(dataName, format, filePath)
     .then(() => {
       console.log(`Data imported from ${filePath} to ${dataName}`);
     })
     .catch((error) => {
       console.error("Error importing data:", error);
     });
   ```

   This code will import data from the specified XLSX file into your data.

Make sure to replace "yourDataName" with the actual name of your data and provide the correct file path in the "filePath" variable.
