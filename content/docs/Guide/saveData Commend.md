---
title: "saveData Commend"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-8"
weight: 810
toc: true
---

The `saveData` command is used to add new data to a database managed by the `jsonverse` package. It is a method of the `jsonverse` class and is responsible for saving data to a specified data store.

## Syntax

```javascript
jsonverse.saveData(dataName, newData)
```

- `dataName` (string): The name of the data store to which you want to add the new data.
- `newData` (object): The data you want to add to the data store.

## Example Usage (Express with Promises)

```javascript
const Jsonverse = require('jsonverse'); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Define a sample data object to add
const newData = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com'
};

// Add the data to the 'users' data store
jsonverse.saveData('users', newData)
  .then(() => {
    console.log('Data added successfully.');
  })
  .catch((error) => {
    console.error('Error adding data:', error);
  });
```

In this example, we create an instance of the `jsonverse` class and use the `saveData` method to add new user data to the 'users' data store. We handle the result using promises for asynchronous operation.

## Example Usage (Express without Promises)

```javascript
const Jsonverse = require('jsonverse'); // Import the jsonverse package
const jsonverse = new Jsonverse('./data'); // Initialize jsonverse with data folder path

// Define a sample data object to add
const newData = {
  name: 'Jane Smith',
  age: 25,
  email: 'janesmith@example.com'
};

// Add the data to the 'users' data store
jsonverse.saveData('users', newData, (error) => {
  if (error) {
    console.error('Error adding data:', error);
  } else {
    console.log('Data added successfully.');
  }
});
```

In this example, we create an instance of the `jsonverse` class and use the `saveData` method to add new user data to the 'users' data store. We handle the result using a callback function for asynchronous operation.

This documentation provides an overview of the `saveData` command in the `jsonverse` package and demonstrates how to use it in Express applications, both with and without promises.

<div class="note" style=" border-radius: 16px; background-color: rgb(43, 110, 98, 0.2); padding: 16px; margin: 16px; max-width: 600px; padding: 32px; margin: 32px 0; overflow-wrap: break-word;">
  <div class="note-header" style="display: flex; align-items: center;">
    <span class="note-icon" style="font-size: 24px; margin-right: 8px; color: rgb(43, 110, 98);">📝</span>
    <span class="note-title" style="font-weight: bold; color: rgb(68, 172, 153, 1);">Note</span>
  </div>
  <div class="note-body" style="margin-top: 8px;">
    I've added promises to it because I know that some users may need to use <b>Then</b> and <b>Catch</b> . I've provided both versions, one with promises and one without, to assist you further.
  </div>
</div>