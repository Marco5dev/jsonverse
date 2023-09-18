---
title: "Model() Method"
description: "The `model()` method creates and returns a model instance for defining and interacting with data models."
summary: "The `model()` method creates and returns a model instance for defining and interacting with data models."
date: 2023-09-18T13:22:47+03:00
lastmod: 2023-09-18T13:22:47+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "model() Method-bcb72a438a345fab613f8287dde75ce9"
weight: 130
toc: true
---

The `model()` method creates and returns a model instance for defining and interacting with data models.

```javascript
const modelName = 'MyModel';
const schemaDefinition = { /* Schema definition goes here */ };
const myModel = jsonverse.model(modelName, schemaDefinition);
```
or
```javascript
const Jsonverse = require("jsonverse");
const db = new Jsonverse();

const { Schema } = Jsonverse;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = db.model("User", userSchema);
```

Use this method to create and configure data models within the jsonverse instance.
