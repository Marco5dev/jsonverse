---
title: "allData Commend"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-11"
weight: 810
toc: true
---
The `allData` command is used to retrieve all data from all data stores managed by the `jsonverse` package. It is a method of the `jsonverse` class and allows you to fetch all data items from all data stores in a data folder.

## Syntax

```javascript
jsonverse.allData();
```

## Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Fetch all data from all data stores using promises
jsonverse
  .allData()
  .then((allData) => {
    if (allData.length > 0) {
      console.log("All data retrieved successfully:", allData);
    } else {
      console.log("No data found in any data store.");
    }
  })
  .catch((error) => {
    console.error("Error retrieving all data:", error);
  });
```

In this example, we create an instance of the `jsonverse` class and use the `allData` method to retrieve all data items from all data stores in the data folder. We handle the result using promises for asynchronous operation.

## Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Fetch all data from all data stores using a callback function
jsonverse.allData((error, allData) => {
  if (error) {
    console.error("Error retrieving all data:", error);
  } else {
    if (allData.length > 0) {
      console.log("All data retrieved successfully:", allData);
    } else {
      console.log("No data found in any data store.");
    }
  }
});
```

In this example, we create an instance of the `jsonverse` class and use the `allData` method to retrieve all data items from all data stores in the data folder. We handle the result using a callback function for asynchronous operation.

This documentation provides an overview of the `allData` command in the `jsonverse` package, demonstrating how to retrieve all data items from all data stores with and without promises.
