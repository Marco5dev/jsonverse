---
title: "Data Model Creation"
description: ""
summary: ""
date: 2023-09-18T15:26:00+03:00
lastmod: 2023-09-18T15:26:00+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Data Model Creation-934ed58e5c35a1f8a185e6678701974a"
weight: 460
toc: true
---

In Jsonverse, you define your data models using schemas. A schema defines the structure and validation rules for the data that your model will work with. To create a data model, you'll need to follow these steps:

1. Define a Schema: Start by defining a schema that describes the shape of your data. A schema is an object where each key represents a field in your data, and the corresponding value defines the data type and validation rules.

2. Create a Model: Once you have a schema, you can create a model based on that schema. A model is a JavaScript class that provides methods for interacting with the data.

Let's explore each step in detail:

## 1. Define a Schema

A schema is a blueprint for your data. It defines the structure of documents in your data collection. Here's an example of a simple schema for a user:

```js
const userSchema = {
  name: String,
  email: String,
  age: Number,
};
```

In this schema:

- `name`, `email`, and `age` are fields in the user document.
- `String` and `Number` are data types, specifying the expected types for each field.

You can define more complex schemas with nested objects, arrays, and custom validation functions as needed.

## 2. Create a Model

After defining a schema, you can create a model based on that schema. A model is an instance of the `Model` class provided by Jsonverse. Here's how to create a model:

```js
const userModel = jsonverse.model("User", userSchema);
```

In this example:

- `User` is the name of the model, and it will be used as the data collection name.
- `userSchema` is the schema we defined earlier.

With the `userModel` instance, you can perform operations such as saving, updating, deleting, and querying user data.

Now that you understand how to create data models in Jsonverse, you can start working with your data using these models. Models help you maintain the integrity of your data by enforcing the schema rules you've defined.
