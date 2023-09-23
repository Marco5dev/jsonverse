# jsonVerse

jsonVerse is a lightweight JSON-based database package for Node.js. It provides a simple interface to store, retrieve, and manage data using JSON files.

[![Build](https://github.com/Marco5dev/jsonverse/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Marco5dev/jsonverse/actions/workflows/npm-publish.yml)
[![NPM Version](https://img.shields.io/npm/v/jsonverse.svg)](https://www.npmjs.com/package/jsonverse)
[![NPM Downloads](https://img.shields.io/npm/dt/jsonverse.svg)](https://www.npmjs.com/package/jsonverse)
[![Github Repo Size](https://img.shields.io/github/repo-size/Marco5dev/jsonverse.svg)](https://github.com/Marco5dev/jsonverse)
[![LICENSE](https://img.shields.io/npm/l/jsonverse.svg)](https://github.com/Marco5dev/jsonverse/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/Marco5dev/jsonverse.svg)](https://github.com/Marco5dev/jsonverse/graphs/contributors)
[![Commit](https://img.shields.io/github/last-commit/Marco5dev/jsonverse.svg)](https://github.com/Marco5dev/jsonverse/commits/master)

## Introduction

The jsonVerse package is a powerful utility designed to simplify the management of JSON data files within a designated folder. It offers methods for adding, editing, deleting, and retrieving data from JSON files. This wiki provides detailed examples and usage scenarios to help you effectively implement the jsonVerse package in your projects.

## Installation

To begin using the jsonVerse package, you'll need to install it via npm. Open your terminal and run the following command:

```bash
npm install jsonverse
```

## Usage

### Import and Initialization

To get started, import the required modules, set up an Express router, and initialize the jsonVerse instance:

```javascript
const express = require("express");
const app = express();
const jsonverse = require("jsonverse");

// Initialize the JSONDatabase instance
const db = new jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});
```

### Display All Data

You can display all the data from your website using the following code:

```javascript
app.get("/", async (req, res) => {
  try {
    const allData = await db.allData();
    // ... (rendering logic)
  } catch (err) {
    // ... (error handling)
  }
});
```

### Display Data from a specific data json file

you can display data from a specific data file by file name

```javascript
app.get("/", async (req, res) => {
  try {
    db.readData(dataName) // dataName: the name of the json file like test.json the data name will be "test"
      .then((result) => {
        res.send(result); // result is the content of the json file
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    // ... (error handling)
  }
});
```

### Add Data

To add data, use the following code:

```javascript
app.post("/add", async (req, res) => {
  try {
    const { dataName, name, social, rank, competition, date, edu, password } =
      req.body;
    const newData = {
      social,
      name,
      rank,
      competition,
      date,
      edu,
      password: db.encrypt(password, "Your-Secret-Key"),
    };
    await db.saveData(dataName, newData);
    // ... (redirect or response)
  } catch (err) {
    // ... (error handling)
  }
});
```

### Get Data by ID

Retrieve data by its ID with this code:

```javascript
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.findById(id);
    if (result) {
      // ... (rendering logic)
      // remember if the retrieved data contained encrypted data to use
      // db.decrypt(encryptedData, secretKey)
    } else {
      // ... (not found logic)
    }
  } catch (err) {
    // ... (error handling)
  }
});
```

### Delete Data by ID

Delete data by its ID using this code:

```javascript
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.delById(id);
    // ... (response or redirect)
  } catch (err) {
    // ... (error handling)
  }
});
```

### Edit Data by ID

Edit existing data using this code:

```javascript
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { name, social, rank, competition, date, edu } = req.body;
  try {
    const updatedData = {
      social,
      name,
      rank,
      competition,
      date,
      edu,
    };
    await db.editById(id, updatedData);
    // ... (response or redirect)
  } catch (err) {
    // ... (error handling)
  }
});
```

### Encrypt/Decrypt

you can encrypt/decrypt the data that you are saving by this commend

- Encrypt

```javascript
db.encrypt(data, secretKey);
```

- Decrypt

```javascript
db.decrypt(encryptedData, secretKey);
```

### Backup

backup the data files you want by the dataName in Backup folder in Data Folder (the package create it automatically)

```javascript
db.backupCreate(dataName); //  dataName: the name of the data file you want to backup
```

### Restore Backup

Restore the backup data files you want by the dataName in Backup `./Data/Backup` ./Data is the path you add to the data folder

```javascript
db.backupRestore(dataName, backupFileName); // the dataName is the data you want to restore to it & the backupFileName is the backup file name you got after backing up
```

### Delete Backup

Delete the backup data json files you want by the dataName in Backup folder in Data Folder (the package create it automatically)

```javascript
const retentionDays = 5; // write here with days the time you want to delete the backups since then like i want to delete the backup the had been saved the last 5 days
db.backupDelete(dataName, retentionDays);
```

### Import/Export Data

- Import

you can import data from json files from outside the project files

```javascript
db.importData(dataName, (format = "json"), filePath);
// dataName: the data file you want to import to if exist if doesn't write the new data name instead
// format: to set the format to json you don't need to write it it's json by default
// filePath: where is the file you want to import
```

- Export

you can Export data from json files

```javascript
db.exportData(dataName, (format = "json"));
// dataName: the data file you want to Export
// format: to set the format of the new exported file like json and csv
```

## Conclusion

The jsonVerse package simplifies the management of JSON data files within a specified folder. With the provided examples and usage instructions, you'll be able to efficiently integrate the jsonVerse package into your projects to streamline data operations.
