---
title: "Updating Data"
description: "To update existing data in the jsonverse database, you can use the `update()` method. This method allows you to modify specific records based on a query. Here's how to use it:"
summary: "To update existing data in the jsonverse database, you can use the `update()` method. This method allows you to modify specific records based on a query. Here's how to use it:"
date: 2023-09-18T14:48:43+03:00
lastmod: 2023-09-18T14:48:43+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Updating Data-b54f293db18aae5327c8446a7987b51c"
weight: 240
toc: true
---

To update existing data in the jsonverse database, you can use the `update()` method. This method allows you to modify specific records based on a query. Here's how to use it:

## 1. **Update by Query:**

   You can update data by specifying a query that filters the records you want to modify. Here's an example:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Define a query to filter the data you want to update
   const query = { field: "value" };

   // Define the updates you want to apply
   const updates = { fieldToUpdate: "newValue" };

   jsonverse.update(dataName, query, updates)
     .then(() => {
       console.log("Data updated successfully.");
     })
     .catch((error) => {
       console.error("Error updating data:", error);
     });
   ```
   
   Replace "yourDataName" with the actual data name, customize the query to match your criteria, and specify the updates you want to apply.

## 2. **Update by ID:**

   If you know the unique ID of the record you want to update, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Replace "yourIDToUpdate" with the ID of the data you want to update
   const idToUpdate = "yourIDToUpdate";

   // Define the updates you want to apply
   const updates = { fieldToUpdate: "newValue" };

   jsonverse.updateByID(dataName, idToUpdate, updates)
     .then(() => {
       console.log("Data updated successfully.");
     })
     .catch((error) => {
       console.error("Error updating data:", error);
     });
   ```
   
   Make sure to replace "yourDataName," "yourIDToUpdate," and specify the updates you want to apply.

## 3. **Update All Data:**

   To update all data within a specific data name, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Define the updates you want to apply to all records
   const updates = { fieldToUpdate: "newValue" };

   jsonverse.updateAll(dataName, updates)
     .then(() => {
       console.log("All data updated successfully.");
     })
     .catch((error) => {
       console.error("Error updating data:", error);
     });
   ```
   
   Be cautious when using this method, as it will apply updates to all records within the specified data name.

Remember to replace "yourDataName," "yourIDToUpdate," and other placeholders with your actual data names, IDs, queries, and update criteria.
