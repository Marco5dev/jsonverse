---
title: "Encrypt & Decrypt Data"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-21"
weight: 810
toc: true
---
The `encrypt` method is used to encrypt sensitive data using a secret key.

## Syntax

```javascript
jsonverse.encrypt(data, secretKey);
```

- `data` (object): The data to be encrypted.
- `secretKey` (string): The secret key used for encryption.

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
// Initialize the JSONDatabase instance
const db = new Jsonverse({
  dataFolderPath: "./MyData", // data directory
  logFolderPath: "./MyLogs", // logs directory
  activateLogs: true, // to enable the logs set this value to true
});

// Encrypt sensitive data using promises
const sensitiveData = { username: "john_doe", password: "s3cr3t" };
const secretKey = "mySecretKey";
const encryptedData = jsonverse.encrypt(sensitiveData, secretKey);
console.log("Encrypted Data:", encryptedData);
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Encrypt sensitive data using a callback function
const sensitiveData = { username: "john_doe", password: "s3cr3t" };
const secretKey = "mySecretKey";

jsonverse.encrypt(sensitiveData, secretKey, (error, encryptedData) => {
  if (error) {
    console.error("Error encrypting data:", error);
  } else {
    console.log("Encrypted Data:", encryptedData);
  }
});
```

The `decrypt` method is used to decrypt previously encrypted data using a secret key.

## Syntax

```javascript
jsonverse.decrypt(encryptedData, secretKey);
```

- `encryptedData` (string): The encrypted data to be decrypted.
- `secretKey` (string): The secret key used for decryption.

### Example Usage (With Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Decrypt previously encrypted data using promises
const encryptedData = "..."; // Replace with your encrypted data
const secretKey = "mySecretKey";
const decryptedData = jsonverse.decrypt(encryptedData, secretKey);
console.log("Decrypted Data:", decryptedData);
```

### Example Usage (Without Promises)

```javascript
const Jsonverse = require("jsonverse"); // Import the jsonverse package
const jsonverse = new Jsonverse("./data"); // Initialize jsonverse with data folder path

// Decrypt previously encrypted data using a callback function
const encryptedData = "..."; // Replace with your encrypted data
const secretKey = "mySecretKey";

jsonverse.decrypt(encryptedData, secretKey, (error, decryptedData) => {
  if (error) {
    console.error("Error decrypting data:", error);
  } else {
    console.log("Decrypted Data:", decryptedData);
  }
});
```

These encryption and decryption methods provide a secure way to protect and access sensitive data in the `jsonverse` package. You can use them to encrypt data with a secret key and decrypt it when needed with and without promises.
