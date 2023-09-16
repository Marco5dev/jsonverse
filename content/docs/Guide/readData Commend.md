---
title: "readData Commend"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-6"
weight: 810
toc: true
---
The `readData` command is used to retrieve data from a database managed by the `jsonverse` package. It is a method of the `jsonverse` class and allows you to read data from a specified data store.

## Syntax

```javascript
jsonverse.readData(dataName);
```

- `dataName` (string): The name or identifier of the data store you want to read from.

## Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Define the name of the data store to read from
const dataStoreName = "exampleData"; // Replace with the actual data store name

// Read data from the specified data store using promises
jsonverse
  .readData(dataStoreName)
  .then((data) => {
    if (data) {
      console.log("Data read successfully:", data);
    } else {
      console.log("Data store is empty or does not exist.");
    }
  })
  .catch((error) => {
    console.error("Error reading data:", error);
  });
```

In this example, we create an instance of the `jsonverse` class and use the `readData` method to retrieve data from a specified data store. We handle the result using promises for asynchronous operation.

## Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Define the name of the data store to read from
const dataStoreName = "exampleData"; // Replace with the actual data store name

// Read data from the specified data store using a callback function
jsonverse.readData(dataStoreName, (error, data) => {
  if (error) {
    console.error("Error reading data:", error);
  } else {
    if (data) {
      console.log("Data read successfully:", data);
    } else {
      console.log("Data store is empty or does not exist.");
    }
  }
});
```

In this example, we create an instance of the `jsonverse` class and use the `readData` method to retrieve data from a specified data store. We handle the result using a callback function for asynchronous operation.

This documentation provides an overview of the `readData` command in the `jsonverse` package, demonstrating how to read data from data stores with and without promises.
