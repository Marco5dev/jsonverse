---
title: "Logging Methods"
description: "The `jsonverse` class provides methods for logging messages to both the console and log files."
summary: "The `jsonverse` class provides methods for logging messages to both the console and log files."
date: 2023-09-18T13:22:56+03:00
lastmod: 2023-09-18T13:22:56+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Logging Methods-fe78668ccb557c4fe42c20a3358ab1b8"
weight: 140
toc: true
---

The `jsonverse` class provides methods for logging messages to both the console and log files.

## logToConsoleAndFile(message) Method

The `logToConsoleAndFile(message)` method logs a message to both the console and the log file.

```javascript
jsonverse.logToConsoleAndFile('This is a log message.');
```

Use this method to log messages that should be displayed in the console and recorded in a log file.

## logError(message) Method

The `logError(message)` method logs an error message to both the console and the log file.

```javascript
jsonverse.logError('This is an error message.');
```

Use this method to log and handle errors within your jsonverse application.
