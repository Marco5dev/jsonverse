---
title: "Installation"
description: "To use the jsonverse database package in your Node.js project, follow these steps:"
summary: "To use the jsonverse database package in your Node.js project, follow these steps:"
date: 2023-09-17T21:59:37+03:00
lastmod: 2023-09-17T21:59:37+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "installation-0a63b9597b419befe7ffcd856be0a38f"
weight: 20
toc: true
---

## How to Install ?

To use the jsonverse database package in your Node.js project, follow these steps:

1. **Open your terminal or command prompt**.

2. **Navigate to your project directory**.

3. **Install jsonverse using npm or yarn**:

   ```bash
   npm install jsonverse
   ```

   This will download and install the jsonverse package and its dependencies in your project.

4.  **Require jsonverse in your Node.js code**:

   ```javascript
   const jsonverse = require('jsonverse');
   ```

   You can now use the jsonverse package in your Node.js application to manage your data.

## Notes:

- **Configuration Options**: You can customize the behavior of jsonverse by providing configuration options when initializing it. Refer to the [Configuration](#configuration) section for details on available options.

- **Logging**: By default, jsonverse logs to both the console and a log file. You can control this behavior using the `activateLogs` option. For more details, see the [Logging](#logging) section.

- **Data Folder**: By default, jsonverse stores data in a folder named "Data" in your project directory. You can change this folder's location by setting the `dataFolderPath` option. Learn more in the [Data Storage](#data-storage) section.

- **Data Encryption**: jsonverse provides encryption and decryption functions for sensitive data. See the [Data Encryption](#data-encryption) section for details.

## Next Steps:

Now that you've successfully installed jsonverse, you can explore more about how to use it and configure it to meet your project's needs:

- **Initializing jsonverse**: Learn how to initialize jsonverse with custom configuration options.

- **Data Operations**: Discover how to save, delete, update, and query data using jsonverse.

- **Backup and Restore**: Explore data backup and restoration features.

- **Data Encryption**: Learn how to secure sensitive data with encryption and decryption.

- **Search and Indexing**: Understand how to create and use search indexes for efficient data retrieval.

For more detailed information, refer to the corresponding sections in this documentation.
