---
title: "editById Commend"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-9"
weight: 810
toc: true
---
The `editByID` command is used to update data in a database managed by the `jsonverse` package based on a specified ID. It is a method of the `jsonverse` class and allows you to modify specific data items in a data store.

## Syntax

```javascript
jsonverse.editByID(id, updatedData);
```

- `id` (string): The unique identifier of the data item you want to edit.
- `updatedData` (object): The updated data you want to apply to the specified data item.

## Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Define the ID of the data item to edit
const itemIdToEdit = "12345"; // Replace with the actual ID

// Define the updated data
const updatedData = {
  name: "Updated Name",
  age: 35,
};

// Edit the data item with the specified ID using promises
jsonverse
  .editByID(itemIdToEdit, updatedData)
  .then(() => {
    console.log("Data item edited successfully.");
  })
  .catch((error) => {
    console.error("Error editing data:", error);
  });
```

In this example, we create an instance of the `jsonverse` class and use the `editByID` method to update a specific data item in the data store based on its ID. We handle the result using promises for asynchronous operation.

## Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Define the ID of the data item to edit
const itemIdToEdit = "12345"; // Replace with the actual ID

// Define the updated data
const updatedData = {
  name: "Updated Name",
  age: 35,
};

// Edit the data item with the specified ID using a callback function
jsonverse.editByID(itemIdToEdit, updatedData, (error) => {
  if (error) {
    console.error("Error editing data:", error);
  } else {
    console.log("Data item edited successfully.");
  }
});
```

In this example, we create an instance of the `jsonverse` class and use the `editByID` method to update a specific data item in the data store based on its ID. We handle the result using a callback function for asynchronous operation.

This documentation provides an overview of the `editByID` command in the `jsonverse` package, demonstrating how to edit data items by their unique IDs with and without promises.
