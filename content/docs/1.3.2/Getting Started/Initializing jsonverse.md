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

<div class="pitfall">
  <h3 class="pitfall-h3">
    <svg
      class="inline me-3 mb-1 text-lg text-yellow-50 dark:text-yellow-40"
      width="2em"
      height="2em"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_738_836)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27 48L27 57.3409L40.0772 48L55.6975 48C57.1595 48 58.1986 47.0112 58.3851 45.8604C59.1824 40.9398 60 34.619 60 29.625C60 24.7282 59.2125 18.7546 58.4302 14.0813C58.2445 12.9721 57.2326 12 55.7805 12L16.2195 12C14.7674 12 13.7555 12.9721 13.5698 14.0813C12.7875 18.7546 12 24.7282 12 29.625C12 34.619 12.8176 40.9398 13.6149 45.8604C13.8014 47.0112 14.8404 48 16.3025 48H27ZM42 54H55.6975C59.9534 54 63.6271 51.0213 64.3078 46.8201C65.1161 41.8322 66 35.1209 66 29.625C66 24.2196 65.1449 17.8522 64.3478 13.0906C63.6513 8.93026 59.9987 6 55.7805 6H16.2195C12.0013 6 8.34867 8.93026 7.65218 13.0906C6.85505 17.8522 6 24.2196 6 29.625C6 35.1209 6.88391 41.8322 7.69215 46.8201C8.37291 51.0213 12.0466 54 16.3025 54H21L21 63.1704C21 65.6106 23.7581 67.0299 25.7437 65.6116L42 54ZM39 39.3686C39 40.9422 38 41.9912 36 41.9912C34 41.9912 33 40.9422 33 39.3686C33 37.7951 34 36.746 36 36.746C38 36.746 39 37.7951 39 39.3686ZM38.1771 20.2412C38.1771 18.9986 37.1697 17.9912 35.9271 17.9912C34.6845 17.9912 33.6771 18.9986 33.6771 20.2412V31.5956C33.6771 32.8382 34.6845 33.8456 35.9271 33.8456C37.1697 33.8456 38.1771 32.8382 38.1771 31.5956V20.2412Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_738_836">
          <rect width="72" height="72" fill="white"></rect>
        </clipPath>
      </defs></svg>Pitfall
  </h3>
  <div class="relative">
    <div class="py-2">
      <p class="whitespace-pre-wrap my-4">
        <strong>JsonVerse</strong>, serves as a database solution similar to
        <a href="https://mongoosejs.com/"><strong>Mongoose</strong></a
        >. To seamlessly connect this database to the front end, you'll utilize
        <a href="https://expressjs.com/"><strong>ExpressJS</strong></a> and
        employ the <code>Fetch</code> API.
      </p>
    </div>
  </div>
</div>

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
