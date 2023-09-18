---
title: "Decrypting Sensitive Data"
description: ""
summary: ""
date: 2023-09-18T15:14:20+03:00
lastmod: 2023-09-18T15:14:20+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Decrypting Sensitive Data-2661997dd34359d97ace3d44b3e05bd0"
weight: 340
toc: true
---

In the previous section, we discussed how to encrypt sensitive data using jsonverse. Now, let's explore how to decrypt this data when needed.

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

In the code above, replace "encryptedData" with the encrypted data you want to decrypt and use the same "secretKey" that was used for encryption. The `jsonverse.decrypt` function will decrypt the data, returning it to its original form.

It's important to note that you should keep your secret key confidential and secure. Without the correct secret key, you won't be able to decrypt the data successfully. Therefore, ensure that you have proper key management practices in place to maintain the security of your sensitive data.

By being able to decrypt sensitive data when needed, you can access and utilize it while maintaining the security and confidentiality of your information.
