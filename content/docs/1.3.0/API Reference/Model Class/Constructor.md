---
title: "Constructor"
description: "The constructor initializes a `Model` instance with the specified data name and schema definition."
summary: "The constructor initializes a `Model` instance with the specified data name and schema definition."
date: 2023-09-18T13:21:43+03:00
lastmod: 2023-09-18T13:21:43+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Constructor-98c524aa263d84d9c0010b6477669a99"
weight: 160
toc: true
---

The constructor initializes a `Model` instance with the specified data name and schema definition.

```javascript
const dataName = 'MyModel';
const schemaDefinition = { /* Schema definition goes here */ };
const myModel = new Model(dataName, schemaDefinition);
```

Use this constructor to create a `Model` instance for defining and interacting with data models within the `jsonverse` instance.
