---
title: "Example Usage"
description: "In this section, we'll provide some practical examples of how to use Jsonverse in your applications. These examples will help you understand how to perform common database operations and leverage Jsonverse's features effectively."
summary: "In this section, we'll provide some practical examples of how to use Jsonverse in your applications. These examples will help you understand how to perform common database operations and leverage Jsonverse's features effectively."
date: 2023-09-18T15:25:51+03:00
lastmod: 2023-09-18T15:25:51+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Example Usage-58ec11666e47e1e30cadaeb7e1f7b4d7"
weight: 450
toc: true
---

In this section, we'll provide some practical examples of how to use Jsonverse in your applications. These examples will help you understand how to perform common database operations and leverage Jsonverse's features effectively.

## Basic Database Operations

### Initializing Jsonverse

To get started with Jsonverse, you'll need to initialize it with appropriate options. Here's an example of how to initialize Jsonverse:

```js
const Jsonverse = require("jsonverse");

// Initialize Jsonverse with custom options
const jsonverse = new Jsonverse({
  dataFolderPath: "./myData",
  logFolderPath: "./myLogs",
  activateLogs: true,
});
```

### Saving Data

To save data to a model, use the `save` method. Here's an example of saving a new user to the User model:

```js
const newUser = {
  name: "John Doe",
  email: "john@example.com",
  age: 30,
};

db
  .saveData(dataName, newUser) //dataName is where you want to save for example "Users" to save in ./Data/Users.json don't worry if the file doesn't exist it will ask you to create it in the console
  .then((result) => {
    console.log("User saved successfully:", result);
  })
  .catch((error) => {
    console.error("Error saving user:", error);
  });
```

### Finding Data

You can find data in a model using the `find` method. Here's an example of finding all users:

```js
db
  .findById(Id)
  .then((users) => {
    console.log("Found users:", users);
  })
  .catch((error) => {
    console.error("Error finding users:", error);
  });
```

## Advanced Database Operations

### Data Backup and Restore

Jsonverse allows you to create backups of your data and restore it when needed. Here's how you can create a backup and restore it:

```js
// Create a backup of data
jsonverse.backupCreate("User") // -> ./Data/Backups/User_20230101235959.json
  .then(() => {
    console.log("Data backup created successfully.");
  })
  .catch((error) => {
    console.error("Error creating data backup:", error);
  });

// Restore data from a backup
const backupFileName = "User_20230101235959.json"; // Replace with an actual backup file name
jsonverse.backupRestore("User", backupFileName)
  .then(() => {
    console.log("Data restored from backup.");
  })
  .catch((error) => {
    console.error("Error restoring data from backup:", error);
  });
```

These are just a few examples of how you can use Jsonverse in your applications. You can explore more features and functionalities by referring to the documentation and tutorials.
