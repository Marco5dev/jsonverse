---
title: "findById Commend"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-5"
weight: 810
toc: true
---
The `findByID` command is used to retrieve data from a database managed by the `jsonverse` package based on a specified ID. It is a method of the `jsonverse` class and allows you to locate specific data items in a data store.

## Syntax

```javascript
jsonverse.findByID(id);
```

- `id` (string): The unique identifier of the data item you want to find.

## Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Define the ID of the data item to find
const itemIdToFind = "12345"; // Replace with the actual ID

// Find the data item with the specified ID using promises
jsonverse
  .findByID(itemIdToFind)
  .then((dataItem) => {
    if (dataItem) {
      console.log("Data item found:", dataItem);
    } else {
      console.log("Data item not found.");
    }
  })
  .catch((error) => {
    console.error("Error finding data:", error);
  });
```

In this example, we create an instance of the `jsonverse` class and use the `findByID` method to retrieve a specific data item from the data store based on its ID. We handle the result using promises for asynchronous operation.

## Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Define the ID of the data item to find
const itemIdToFind = "12345"; // Replace with the actual ID

// Find the data item with the specified ID using a callback function
jsonverse.findByID(itemIdToFind, (error, dataItem) => {
  if (error) {
    console.error("Error finding data:", error);
  } else {
    if (dataItem) {
      console.log("Data item found:", dataItem);
    } else {
      console.log("Data item not found.");
    }
  }
});
```

In this example, we create an instance of the `jsonverse` class and use the `findByID` method to retrieve a specific data item from the data store based on its ID. We handle the result using a callback function for asynchronous operation.

This documentation provides an overview of the `findByID` command in the `jsonverse` package, demonstrating how to find data items by their unique IDs with and without promises.
