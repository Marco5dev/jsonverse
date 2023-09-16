---
title: "Backup methods"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-6a1a6be4373e933280d78ea53de615gh"
weight: 810
toc: true
---
The `backupCreate` method is used to create a backup of the data in a specified data store.

## Syntax

```javascript
jsonverse.backupCreate(dataName);
```

- `dataName` (string): The name or identifier of the data store for which you want to create a backup.

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Create a backup of the specified data store using promises
jsonverse
  .backupCreate("exampleData")
  .then(() => {
    console.log("Backup created successfully.");
  })
  .catch((error) => {
    console.error("Error creating backup:", error);
  });
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Create a backup of the specified data store using a callback function
jsonverse.backupCreate("exampleData", (error) => {
  if (error) {
    console.error("Error creating backup:", error);
  } else {
    console.log("Backup created successfully.");
  }
});
```

The `backupRestore` method is used to restore data from a backup file into a specified data store.

## Syntax

```javascript
jsonverse.backupRestore(dataName, backupFileName);
```

- `dataName` (string): The name or identifier of the data store to which you want to restore data.
- `backupFileName` (string): The name of the backup file to restore data from.

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Restore data from a backup file into the specified data store using promises
jsonverse
  .backupRestore("exampleData", "backup_20230906120000.json")
  .then(() => {
    console.log("Data restored from backup successfully.");
  })
  .catch((error) => {
    console.error("Error restoring data from backup:", error);
  });
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Restore data from a backup file into the specified data store using a callback function
jsonverse.backupRestore(
  "exampleData",
  "backup_20230906120000.json",
  (error) => {
    if (error) {
      console.error("Error restoring data from backup:", error);
    } else {
      console.log("Data restored from backup successfully.");
    }
  }
);
```

The `backupDelete` method is used to delete old backups from a specified data store based on retention criteria.

## Syntax

```javascript
jsonverse.backupDelete(dataName, retentionDays);
```

- `dataName` (string): The name or identifier of the data store for which you want to delete old backups.
- `retentionDays` (number): The number of days to retain backups. Backups older than this value will be deleted.

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Delete old backups for the specified data store using promises
jsonverse
  .backupDelete("exampleData", 7) // Retain backups for 7 days
  .then(() => {
    console.log("Old backups deleted successfully.");
  })
  .catch((error) => {
    console.error("Error deleting old backups:", error);
  });
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Delete old backups for the specified data store using a callback function
jsonverse.backupDelete("exampleData", 7, (error) => {
  // Retain backups for 7 days
  if (error) {
    console.error("Error deleting old backups:", error);
  } else {
    console.log("Old backups deleted successfully.");
  }
});
```

These backup methods provide essential functionality for data protection
