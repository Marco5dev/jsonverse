---
title: "Update() Method"
description: "The `update()` method allows you to update data in the database using a `Model` instance."
summary: "The `update()` method allows you to update data in the database using a `Model` instance."
date: 2023-09-18T13:23:24+03:00
lastmod: 2023-09-18T13:23:24+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "update() Method-353bca8f38b1ee5bc699b38ccf67ee68"
weight: 190
toc: true
beta: true
---

The `update()` method allows you to update data in the database using a `Model` instance.

```javascript
const query = { /* Query to specify which data to update goes here */ };
const updates = { /* Data updates to apply go here */ };
try {
  await myModel.update(query, updates);
  // Data updated successfully
} catch (error) {
  // Handle any errors
}
```

Use this method to update data in the database based on a specified query and set of updates.
