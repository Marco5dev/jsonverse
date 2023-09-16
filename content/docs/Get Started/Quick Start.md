---
title: "Quick Start"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-6a1a6be4373e933280d78ea53de6158e"
weight: 810
toc: true
---
Welcome to jsonverse, a powerful data management package for Node.js! This guide will walk you through the essential steps to get started with jsonverse in your Node.js project.

## Installation

To begin using jsonverse, you need to install it in your project. Open your terminal and run the following command:

```sh
npm install jsonverse
```

This command will download and install the jsonverse package in your project directory.

## Import jsonverse

After installing jsonverse, you can import it into your Node.js application using the following code:

```javascript
const Jsonverse = require("jsonverse");
```

This line imports the jsonverse package and makes its functionalities available in your application.

## Initialize jsonverse

To use jsonverse, you need to initialize it with a data folder path. This folder will be used to store your data files. Here's how you can initialize jsonverse:

```javascript
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});
```

In the code above, you create a new instance of jsonverse with the specified data folder path.

## Create Data

With jsonverse, you can easily create data stores and add data to them using the `saveData` method. Here's an example:

```javascript
const newData = { name: "John Doe", age: 30 };
jsonverse.saveData("userData", newData);
```

In this example, you create a new data store named 'userData' and add the 'newData' object to it.

## Read Data

You can read data from a data store using the `readData` method. It returns an array of data objects. For example:

```javascript
const userData = jsonverse.readData("userData");
console.log(userData);
```

The `readData` method retrieves the data from the 'userData' store and logs it to the console.

## Update Data

To update data in a data store, you can use methods like `editByID` or `writeDataByFileName`. Here's an example using `editByID`:

```javascript
const updatedData = { age: 31 };
jsonverse.editByID("userData", "your-item-id", updatedData);
```

In this code, you update an item in the 'userData' store with the specified ID.

## Delete Data

To remove data from a data store, you can use the `delByID` method. For example:

```javascript
jsonverse.delByID("userData", "your-item-id");
```

The `delByID` method deletes an item with the specified ID from the 'userData' store.

These are the fundamental steps to get started with jsonverse. You can now create, read, update, and delete data in your Node.js application using this powerful package.
