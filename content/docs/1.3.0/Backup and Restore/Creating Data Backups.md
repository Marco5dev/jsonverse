---
title: "Creating Data Backups"
description: ""
summary: ""
date: 2023-09-18T15:08:15+03:00
lastmod: 2023-09-18T15:08:15+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Creating Data Backups-8931620a97c76c5ece709cfcb30d9243"
weight: 290
toc: true
---

Creating data backups is essential for preserving your data in case of unexpected data loss or changes. jsonverse provides functionality to create backups of your data and restore them when needed.

## Creating Data Backups

To create a backup of your data, you can use the following code:

```js
const jsonverse = require("jsonverse");

// Replace "yourDataName" with the name of your data
const dataName = "yourDataName";

jsonverse.backupCreate(dataName)
  .then(() => {
    console.log(`Backup created for ${dataName}`);
  })
  .catch((error) => {
    console.error("Error creating backup:", error);
  });
```

This code will create a backup of your data with a timestamp indicating when the backup was created. Backups are stored in the "Backup" folder within your data directory.

## Restoring Data from Backup

To restore data from a backup, you can use the following code:

```js
const jsonverse = require("jsonverse");

// Replace "yourDataName" with the name of your data
const dataName = "yourDataName";

// Replace "backupFileName" with the name of the backup file you want to restore
const backupFileName = "yourBackupFileName"; 

jsonverse.backupRestore(dataName, backupFileName)
  .then(() => {
    console.log(`Data restored from ${backupFileName} to ${dataName}`);
  })
  .catch((error) => {
    console.error("Error restoring data:", error);
  });
```

This code will restore your data from the specified backup file. Make sure to replace "yourDataName" with the actual name of your data and provide the correct "backupFileName."

Remember to create backups regularly to ensure data safety and use the "backupRestore" function to restore data when necessary.

Keep in mind that backups are stored in the "Backup" folder within your data directory and are named with a timestamp indicating when the backup was created.
