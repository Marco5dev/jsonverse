---
title: "Exporting Data"
description: "Exporting data from the jsonverse database allows you to save your data in various formats, such as JSON and CSV. Here's how you can export your data:"
summary: "Exporting data from the jsonverse database allows you to save your data in various formats, such as JSON and CSV. Here's how you can export your data:"
date: 2023-09-18T14:48:59+03:00
lastmod: 2023-09-18T14:48:59+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Exporting Data-eafb363aac537ca69cf0d2e5d0c79ba3"
weight: 260
toc: true
---

Exporting data from the jsonverse database allows you to save your data in various formats, such as JSON and CSV. Here's how you can export your data:

## 1. **Export as JSON:**

   You can export your data as a JSON file using the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Specify the format as "json"
   const format = "json";

   jsonverse.exportData(dataName, format)
     .then(() => {
       console.log(`Data exported to ${dataName}.${format}`);
     })
     .catch((error) => {
       console.error("Error exporting data:", error);
     });
   ```

   This code will export your data as a JSON file named after your data name.

## 2. **Export as CSV:**

   To export your data as a CSV file, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Specify the format as "csv"
   const format = "csv";

   jsonverse.exportData(dataName, format)
     .then(() => {
       console.log(`Data exported to ${dataName}.${format}`);
     })
     .catch((error) => {
       console.error("Error exporting data:", error);
     });
   ```

   This code will export your data as a CSV file named after your data name.

## 3. **Export as XLSX:**

   To export your data as a XLSX file, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Specify the format as "xlsx"
   const format = "xlsx";

   jsonverse.exportData(dataName, format)
     .then(() => {
       console.log(`Data exported to ${dataName}.${format}`);
     })
     .catch((error) => {
       console.error("Error exporting data:", error);
     });
   ```

   This code will export your data as a XLSX file named after your data name.

Remember to replace "yourDataName" with the actual name of your data, and you can choose between exporting as JSON or CSV by specifying the "format" variable accordingly.
