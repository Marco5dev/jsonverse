# jsonVerse

jsonVerse is a lightweight JSON-based database package for Node.js. It provides a simple interface to store, retrieve, and manage data using JSON files.

[![Node.js Package NPM](https://github.com/Marco5dev/jsonverse/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Marco5dev/jsonverse/actions/workflows/npm-publish.yml)

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
const db = new jsonverse("./path/to/your/data/folder");
```

### Display All Data

You can display all the data from your website using the following code:

```javascript
app.get("/", async (req, res) => {
  try {
    const allData = await db.getAllData();
    // ... (rendering logic)
  } catch (err) {
    // ... (error handling)
  }
});
```

### Add Data

To add data, use the following code:

```javascript
router.post("/add", async (req, res) => {
  try {
    const { dataName, name, social, rank, competition, date, edu } = req.body;
    const newData = {
      social,
      name,
      rank,
      competition,
      date,
      edu,
    };
    await db.addData(dataName, newData);
    // ... (redirect or response)
  } catch (err) {
    // ... (error handling)
  }
});
```

### Get Data by ID

Retrieve data by its ID with this code:

```javascript
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.findDataById(id);
    if (result) {
      // ... (rendering logic)
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
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.deleteDataById(id);
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
    await db.editDataById(id, updatedData);
    // ... (response or redirect)
  } catch (err) {
    // ... (error handling)
  }
});
```

## Conclusion

The jsonVerse package simplifies the management of JSON data files within a specified folder. With the provided examples and usage instructions, you'll be able to efficiently integrate the jsonVerse package into your projects to streamline data operations.
