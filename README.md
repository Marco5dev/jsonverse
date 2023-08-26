# jsonDB

jsonDB is a lightweight JSON-based database package for Node.js. It provides a simple interface to store, retrieve, and manage data using JSON files.

## Installation

To install jsonDB, use the following command:

```bash
npm install jsonverse
```

## Usage

```javascript
// Import required modules and setup express router
const express = require("express");
const router = express.Router();
const jsonVerse = require("jsonVerse");
// Specify the data folder path
const dataFolderPath = path.join(__dirname, "../Data");

// Initialize the JSONDatabase instance
const db = new jsonDB(dataFolderPath);
```
```javascript
// Display all the website data
router.get("/", async (req, res) => {
  try {
    const allData = await db.getAllData(); // getAllData is used if you have multiple json files andd you want to show them all
    // ... (rendering logic)
  } catch (err) {
    // ... (error handling)
  }
});
```
```javascript
// Add data
router.post("/add", async (req, res) => {
  try {
    const { dataName, name, social, rank, competition, date, edu } = req.body; // here you have to add the dataName which is where you want to save the data in the json files you have, here i store the name of the dataName from the UI (User interface - Front end) 

    // Generate a random unique ID
    // this is a package you have to install
    const uniqueID = uuid.v4();
    const newData = {
      id: uniqueID,
      social,
      name,
      rank,
      competition,
      date,
      edu,
    }; // whatever the data you want to receive from the front end form

    await db.addData(dataName, newData);
    // ... (redirect or response)
  } catch (err) {
    // ... (error handling)
  }
});
```
```javascript
// Get data by ID
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
```javascript
// Delete data by ID
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
```javascript
// Edit data by ID
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { name, social, rank, competition, date, edu } = req.body;

  try {
    const existingData = await db.findDataById(id);

    const updatedData = {
      social,
      name,
      rank,
      competition,
      date,
      edu,
    }; // whatever the data you want to receive from the front end form

    await db.editDataById(id, updatedData)
    // ... (response or redirect)
  } catch (err) {
   // ... (error handling)
  }
});