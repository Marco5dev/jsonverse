---
title: "Get Started with jsonverse API"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "example-30"
weight: 810
toc: true
---
### Function: `initSearchIndex(dataName, options)`

- **Description:** Initializes a search index for a specific data set, allowing for efficient searching of data items based on specified options.

#### Parameters:

- `dataName` (String): The name of the data set for which the search index will be initialized.

- `options` (Object): An object containing options for configuring the search index.

#### Example:

```javascript
// Initialize a search index for the 'products' data set
jsonverse.initSearchIndex('products', {
  keys: ['name', 'description'],
  includeScore: true,
  threshold: 0.6,
});
```

### Function: `searchData(dataName, query)`

- **Description:** Searches for data items within a specific data set based on a given query.

#### Parameters:

- `dataName` (String): The name of the data set in which the search will be performed.

- `query` (String): The search query to match against data items.

#### Returns:

- An array of search results containing matched data items.

#### Example:

```javascript
// Search for products with the query 'product'
const searchResults = jsonverse.searchData('products', 'product');

// Result example:
/*
[
  {
    item: {
      id: '1',
      name: 'Product A',
      description: 'This is product A.',
    },
    score: 0.75, // Score indicating the match quality
  },
  // More matching items...
]
*/
```
**Usage:**

1. Call `initSearchIndex` to initialize the search index for a specific data set. Provide the data set name and search options.
2. Use `searchData` to search for data items within the specified data set by providing a search query.
3. The function will return an array of search results containing matched data items, along with their associated scores.

**Notes:**

1. The `initSearchIndex` function should be called once for each data set you want to enable searching for.
2. Adjust the search options, such as the keys (properties to search on) and threshold (match threshold), according to your search requirements.
3. The `searchData` function allows for fuzzy searching, returning results based on the provided query and search options.
4. The search results include both the matched data item and a score indicating the match quality.
