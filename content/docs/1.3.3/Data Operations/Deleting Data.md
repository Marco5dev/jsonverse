---
title: "Deleting Data"
description: "To delete data from the jsonverse database, you have a few options:"
summary: "To delete data from the jsonverse database, you have a few options:"
date: 2023-09-18T14:48:35+03:00
lastmod: 2023-09-18T14:48:35+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Deleting Data-a9c33c0bbbdaeec4036b71f56f9f13a5"
weight: 230
toc: true
---

To delete data from the jsonverse database, you have a few options:

## 1. **Delete by ID:**

   You can delete data by specifying its unique ID. Here's how to do it:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Replace "yourIDToDelete" with the ID of the data you want to delete
   const idToDelete = "yourIDToDelete";

   jsonverse.delByID(idToDelete)
     .then(() => {
       console.log("Data deleted successfully.");
     })
     .catch((error) => {
       console.error("Error deleting data:", error);
     });
   ```
   Make sure to replace "yourDataName" and "yourIDToDelete" with the actual data name and ID you want to delete.

## 2. **Delete by Query:**

   You can also delete data based on a query. Here's an example:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   // Define a query to filter the data you want to delete
   const query = { field: "value" };

   jsonverse.delete(dataName, query)
     .then(() => {
       console.log("Data deleted successfully.");
     })
     .catch((error) => {
       console.error("Error deleting data:", error);
     });
   ```
   Replace "yourDataName" with the actual data name and customize the query to match your criteria.

## 3. **Delete All Data:**

   To delete all data within a specific data name, you can use the following code:

   ```js
   const jsonverse = require("jsonverse");

   // Replace "yourDataName" with the name of your data
   const dataName = "yourDataName";

   jsonverse.deleteAll(dataName)
     .then(() => {
       console.log("All data deleted successfully.");
     })
     .catch((error) => {
       console.error("Error deleting data:", error);
     });
   ```
   Be cautious when using this method, as it will remove all data associated with the specified data name.

Remember to replace "yourDataName" and other placeholders with your actual data names, IDs, and criteria.
