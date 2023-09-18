---
title: "Delete() Method"
description: "The `delete()` method allows you to delete data from the database using a `Model` instance."
summary: "The `delete()` method allows you to delete data from the database using a `Model` instance."
date: 2023-09-18T13:23:15+03:00
lastmod: 2023-09-18T13:23:15+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "delete() Method-487da9090ae1d34aec48a3bae10a8b5c"
weight: 180
toc: true
---

The `delete()` method allows you to delete data from the database using a `Model` instance.

```javascript
const query = { /* Query to specify which data to delete goes here */ };
try {
  await myModel.delete(query);
  // Data deleted successfully
} catch (error) {
  // Handle any errors
}
```

Use this method to delete data from the database based on a specified query.
