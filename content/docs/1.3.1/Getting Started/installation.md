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

## How to Install

To use the jsonverse database package in your Node.js project, follow these steps:

### 1. **Open your terminal or command prompt**.

### 2. **Navigate to your project directory**.

### 3. **Install jsonverse using npm or yarn**:

   ```bash
   npm install jsonverse
   ```

   This will download and install the jsonverse package and its dependencies in your project.

### 4. **Require jsonverse in your Node.js code**:

```javascript
const jsonverse = require("jsonverse");
```

You can now use the jsonverse package in your Node.js application to manage your data.

<div class="note-element">
  <h3 class="note-h3">
    <svg
      class="inline me-3 mb-1 text-lg text-green-60 dark:text-green-40"
      width="2em"
      height="2em"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_40_48064)">
        <path
          d="M24 27C24 25.3431 25.3431 24 27 24H45C46.6569 24 48 25.3431 48 27C48 28.6569 46.6569 30 45 30H27C25.3431 30 24 28.6569 24 27Z"
          fill="currentColor"
        ></path>
        <path
          d="M24 39C24 37.3431 25.3431 36 27 36H39C40.6569 36 42 37.3431 42 39C42 40.6569 40.6569 42 39 42H27C25.3431 42 24 40.6569 24 39Z"
          fill="currentColor"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 18C12 13.0294 16.0294 9 21 9H51C55.9706 9 60 13.0294 60 18V54C60 58.9706 55.9706 63 51 63H21C16.0294 63 12 58.9706 12 54V18ZM21 15H51C52.6569 15 54 16.3431 54 18V54C54 55.6569 52.6569 57 51 57H21C19.3431 57 18 55.6569 18 54V18C18 16.3431 19.3431 15 21 15Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_40_48064">
          <rect width="72" height="72" fill="white"></rect>
        </clipPath>
      </defs></svg>Note
  </h3>
  <div class="relative">
    <div class="py-2">
      <ol>
        <li class="note-list-item">
          <strong>Configuration Options:</strong> You can customize the behavior
          of jsonverse by providing configuration options when initializing it.
          Refer to the <a href="#configuration">Configuration</a> section for
          details on available options.
        </li>
        <li>
          <strong>Logging:</strong> By default, jsonverse logs to both the
          console and a log file. You can control this behavior using the
          <code>activateLogs</code> option. For more details, see the
          <a href="#logging">Logging</a> section.
        </li>
        <li>
          <strong>Data Folder:</strong> By default, jsonverse stores data in a
          folder named "Data" in your project directory. You can change this
          folder's location by setting the <code>dataFolderPath</code> option.
          Learn more in the <a href="#data-storage">Data Storage</a> section.
        </li>
        <li>
          <strong>Data Encryption:</strong> jsonverse provides encryption and
          decryption functions for sensitive data. See the
          <a href="/docs/1.3.1/data-encryption/encrypting-sensitive-data/">Data Encryption</a> section for details.
        </li>
      </ol>
    </div>
  </div>
</div>

## Next Steps:

Now that you've successfully installed jsonverse, you can explore more about how to use it and configure it to meet your project's needs:

- [**Initializing jsonverse**](/docs/1.3.1/getting-started/initializing-jsonverse/): Learn how to initialize jsonverse with custom configuration options.

- [**Data Operations**](/docs/1.3.1/data-operations/saving-data/): Discover how to save, delete, update, and query data using jsonverse.

- [**Backup and Restore**](/docs/1.3.1/backup-and-restore/creating-data-backups/): Explore data backup and restoration features.

- [**Data Encryption**](/docs/1.3.1/data-encryption/encrypting-sensitive-data/): Learn how to secure sensitive data with encryption and decryption.

- [**Search and Indexing**](/docs/1.3.1/search-and-indexing/initializing-search-index/): Understand how to create and use search indexes for efficient data retrieval.

For more detailed information, refer to the corresponding sections in this documentation.
