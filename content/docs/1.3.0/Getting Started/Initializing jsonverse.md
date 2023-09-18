---
title: "Initializing Jsonverse"
description: "To get started with jsonverse, you need to initialize it in your Node.js application. This section explains how to do that and provides information on configuration options."
summary: "To get started with jsonverse, you need to initialize it in your Node.js application. This section explains how to do that and provides information on configuration options."
date: 2023-09-17T22:05:02+03:00
lastmod: 2023-09-17T22:05:02+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Initializing jsonverse-7793e6b8f548dc60f74373c058d93079"
weight: 30
toc: true
---

To get started with jsonverse, you need to initialize it in your Node.js application. This section explains how to do that and provides information on configuration options.

## Require jsonverse in your Node.js code

   Before you can initialize jsonverse, make sure to require it at the beginning of your script:

   ```javascript
   const jsonverse = require('jsonverse');
   ```

## Initialize jsonverse with custom configuration (optional)

   You can initialize jsonverse with custom configuration options. Here's an example of initializing jsonverse with custom options:

   ```javascript
   const customConfig = {
     dataFolderPath: './customData', // Specify a custom data folder path
     activateLogs: true, // Enable logging to both console and log file
   };

   const myDatabase = new jsonverse(customConfig);
   ```

   - `dataFolderPath` (optional): Specify the path where jsonverse should store data files. If not provided, it defaults to "./Data" in your project directory.

   - `activateLogs` (optional): Set this to `true` to enable logging. By default, jsonverse logs to both the console and a log file.

## Use jsonverse in your application

   Now that jsonverse is initialized, you can start using it to manage your data. Refer to the [Data Operations](#data-operations) section for details on how to perform operations like saving, updating, and querying data.

## Example:

Here's a complete example of initializing and using jsonverse in a Node.js script:

```javascript
const jsonverse = require('jsonverse');

// Custom configuration options (optional)
const customConfig = {
  dataFolderPath: './customData',
  activateLogs: true,
};

const myDatabase = new jsonverse(customConfig);

// Now you can use myDatabase to manage your data
```

That's it! You've successfully initialized jsonverse and can start working with your data. For more details on data operations, data storage, and other features, refer to the corresponding sections in this documentation.
