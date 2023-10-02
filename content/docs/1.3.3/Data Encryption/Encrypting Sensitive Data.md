---
title: "Encrypting Sensitive Data"
description: "jsonverse allows you to encrypt sensitive data before storing it, ensuring that your data remains confidential and secure. This section explains how to encrypt sensitive data using jsonverse."
summary: "jsonverse allows you to encrypt sensitive data before storing it, ensuring that your data remains confidential and secure. This section explains how to encrypt sensitive data using jsonverse."
date: 2023-09-18T15:13:40+03:00
lastmod: 2023-09-18T15:13:40+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Encrypting Sensitive Data-57b486dc7a927673b32ec4244819ef58"
weight: 330
toc: true
---

jsonverse allows you to encrypt sensitive data before storing it, ensuring that your data remains confidential and secure. This section explains how to encrypt sensitive data using jsonverse.

## Encrypting Data

To encrypt sensitive data, you can use the following code:

```js
const jsonverse = require("jsonverse");

// Replace "yourData" with the actual data you want to encrypt
const sensitiveData = {
  username: "exampleUser",
  password: "superSecretPassword",
  creditCard: "1234-5678-9101-1121",
};

// Replace "yourSecretKey" with a strong secret key for encryption
const secretKey = "yourSecretKey";

const encryptedData = jsonverse.encrypt(sensitiveData, secretKey);

console.log("Encrypted Data:", encryptedData);
```

In the code above, replace "yourData" with the actual data you want to encrypt and provide a strong "secretKey" for encryption. The `jsonverse.encrypt` function will encrypt the data, making it secure for storage.

## Decrypting Data

To decrypt encrypted data, use the following code:

```js
const jsonverse = require("jsonverse");

// Replace "encryptedData" with the encrypted data you want to decrypt
const encryptedData = "yourEncryptedData";

// Replace "secretKey" with the same secret key used for encryption
const secretKey = "yourSecretKey";

const decryptedData = jsonverse.decrypt(encryptedData, secretKey);

console.log("Decrypted Data:", decryptedData);
```

Ensure that you replace "encryptedData" with the encrypted data you want to decrypt and use the same "secretKey" used for encryption. The `jsonverse.decrypt` function will decrypt the data, restoring it to its original form.

By encrypting sensitive data, you add an additional layer of security to your stored information, protecting it from unauthorized access.
