---
title: "delById Commend"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-10"
weight: 810
toc: true
---
The `delByID` command is used to delete data from a database managed by the `jsonverse` package based on a specified ID. It is a method of the `jsonverse` class and allows you to remove specific data items from a data store.

## Syntax

```javascript
jsonverse.delByID(id);
```

- `id` (string): The unique identifier of the data item you want to delete.

## Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Define the ID of the data item to delete
const itemIdToDelete = "12345"; // Replace with the actual ID

// Delete the data item with the specified ID using promises
jsonverse
  .delByID(itemIdToDelete)
  .then(() => {
    console.log("Data item deleted successfully.");
  })
  .catch((error) => {
    console.error("Error deleting data:", error);
  });
```

In this example, we create an instance of the `jsonverse` class and use the `delByID` method to delete a specific data item from the data store based on its ID. We handle the result using promises for asynchronous operation.

## Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Define the ID of the data item to delete
const itemIdToDelete = "12345"; // Replace with the actual ID

// Delete the data item with the specified ID using a callback function
jsonverse.delByID(itemIdToDelete, (error) => {
  if (error) {
    console.error("Error deleting data:", error);
  } else {
    console.log("Data item deleted successfully.");
  }
});
```

In this example, we create an instance of the `jsonverse` class and use the `delByID` method to delete a specific data item from the data store based on its ID. We handle the result using a callback function for asynchronous operation.

This documentation provides an overview of the `delByID` command in the `jsonverse` package, demonstrating how to delete data items by their unique IDs with and without promises.
