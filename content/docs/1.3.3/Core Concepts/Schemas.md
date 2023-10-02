---
title: "Schemas"
description: "In jsonverse, schemas define the structure and data types of your data models. A schema is essentially a blueprint for your data models. This section explains how to define and work with schemas."
summary: "In jsonverse, schemas define the structure and data types of your data models. A schema is essentially a blueprint for your data models. This section explains how to define and work with schemas."
date: 2023-09-18T01:59:29+03:00
lastmod: 2023-09-18T01:59:29+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Schemas-a8a28dac85d979d688648c2fda622939"
weight: 60
toc: true
beta: true
---

In jsonverse, schemas define the structure and data types of your data models. A schema is essentially a blueprint for your data models. This section explains how to define and work with schemas.

## 1. **Define a Schema**:

   To define a schema, create an object that describes the structure of your data model. Here's an example of a schema for a User data model:

   ```javascript
   const UserSchema = {
     username: String,
     email: String,
     age: Number,
     active: Boolean,
   };
   ```

   In this example, we define a schema for a User with fields like username, email, age, and active. The data types (String, Number, Boolean) indicate the expected type of each field.

## 2. **Use Schemas in Data Models**:

   Once you have defined a schema, you can use it to create data models. Data models are instances of the jsonverse Model class and are based on your schema.

   ```javascript
   const UserModel = jsonverse.model("User", UserSchema);
   ```

   Here, we create a User data model using the UserSchema.

## 3. **Schema Validation**:

   jsonverse performs basic data validation based on your schema when saving data. If the data doesn't match the schema, it will throw an error.

## 4. **Schema Reusability**:

   You can reuse schemas across multiple data models in your application to ensure consistency in data structure.

## 5. **Schema Evolution**:

   Over time, you may need to update your schemas as your application evolves. It's essential to carefully manage schema changes to avoid data compatibility issues.

## 6. **Advanced Schema Features**:

   jsonverse allows you to define more complex schemas, including nested schemas, arrays, and more advanced validation rules. You can tailor your schemas to your specific data requirements.

   Here's an example of a schema with nested objects:

   ```javascript
   const OrderSchema = {
     orderNumber: String,
     customer: {
       name: String,
       email: String,
     },
     products: [
       {
         name: String,
         price: Number,
       },
     ],
   };
   ```

   In this example, the OrderSchema includes nested objects for the customer and an array of products.


That's the core concept of schemas in jsonverse. They help you define the structure and data types of your data models, ensuring data consistency and integrity.
