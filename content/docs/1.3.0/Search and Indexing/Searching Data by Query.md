---
title: "Searching Data by Query"
description: ""
summary: ""
date: 2023-09-18T15:16:11+03:00
lastmod: 2023-09-18T15:16:11+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Searching Data by Query-2fd0170ed3c654317847c039a889b3f8"
weight: 370
toc: true
---

Once you've initialized the search index for your dataset, you can perform searches on the data based on specific queries. Jsonverse provides powerful search capabilities to help you find the data you need efficiently.

## Searching for Data

To search for data in your dataset, use the following code:

```js
const jsonverse = require("jsonverse");

// Replace "dataName" with the name of your dataset
const dataName = "yourDatasetName";

// Replace "query" with the search query you want to perform
const query = "yourSearchQuery";

// Search for data
const searchResults = jsonverse.searchData(dataName, query);

console.log("Search Results:", searchResults);
```

In the code above, replace "dataName" with the name of your dataset, and set the "query" variable to the search query you want to execute. The `jsonverse.searchData` function will return an array of search results based on your query.

Jsonverse utilizes a powerful search engine under the hood, making it possible to perform complex searches, including partial matches, fuzzy searches, and more. You can customize the search behavior by providing additional options when initializing the search index.

By searching for data within your dataset, you can quickly locate specific records, making it easier to extract meaningful insights and provide relevant information to your users.
