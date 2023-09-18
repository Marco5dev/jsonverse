---
title: "Configuration Options"
description: ""
summary: ""
date: 2023-09-18T15:34:01+03:00
lastmod: 2023-09-18T15:34:01+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Configuration Options-1587127c96475deb5918b91a5d8492aa"
weight: 490
toc: true
---

The `jsonverse` class constructor accepts a configuration object with the following options:

- `dataFolderPath` (string, default: "./Data"): The path to the folder where data files will be stored. If the folder doesn't exist, it will be created.

- `logFolderPath` (string, default: "./Logs"): The path to the folder where log files will be stored. If the folder doesn't exist, it will be created.

- `activateLogs` (boolean, default: true): Whether to enable logging to both the console and log files. Set to `false` to disable logging.

Example usage:

```js
const myJsonverse = new jsonverse({
  dataFolderPath: "./myData",
  logFolderPath: "./myLogs",
  activateLogs: true,
});
```

You can customize these options when creating an instance of the `jsonverse` class to suit your project's needs.
