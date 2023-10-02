---
title: "Save() Method"
description: "The `save()` method allows you to save data to the database using a `Model` instance."
summary: "The `save()` method allows you to save data to the database using a `Model` instance."
date: 2023-09-18T13:23:06+03:00
lastmod: 2023-09-18T13:23:06+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "save() Method-85fa0aaf8ac16b1318330df9bd1cc37b"
weight: 170
toc: true
beta: true
---

The `save()` method allows you to save data to the database using a `Model` instance.

```javascript
const dataToSave = { /* Data to be saved goes here */ };
try {
  await myModel.save(dataToSave);
  // Data saved successfully
} catch (error) {
  // Handle any errors
}
```

Use this method to save data according to the schema definition of the `Model`.
