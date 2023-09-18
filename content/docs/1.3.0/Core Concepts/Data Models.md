---
title: "Data Models"
description: "Data models define the structure and schema of your data in jsonverse. When you create a data model, you specify the fields and their data types. This section explains how to define and work with data models."
summary: "Data models define the structure and schema of your data in jsonverse. When you create a data model, you specify the fields and their data types. This section explains how to define and work with data models."
date: 2023-09-18T02:00:33+03:00
lastmod: 2023-09-18T02:00:33+03:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "Data Models-e895bff170eeccaa93b0bf7c3a259469"
weight: 50
toc: true
---

Data models define the structure and schema of your data in jsonverse. When you create a data model, you specify the fields and their data types. This section explains how to define and work with data models.

1. **Define a Data Model**:

   To define a data model, create an object that describes the schema. Here's an example:

   ```javascript
   const UserSchema = {
   username: String,
   email: String,
   age: Number,
   active: Boolean,
   };
   ```

   In this example, we define a data model for a user with fields like username, email, age, and active. The data types (String, Number, Boolean) indicate the expected type of each field.

2. **Create a Model Instance**:

   To work with a data model, you need to create an instance of it. Use the jsonverse API to create a model instance based on your schema:

   ```javascript
   const UserModel = jsonverse.model('User', UserSchema);
   ```

   In this example, we create a model instance for our User data model.

3. **Data Operations with Models**:

   Once you have a model instance, you can perform various data operations like saving, updating, and querying data. Here are some common operations:

   - **Save Data**:

     ```javascript
     const newUser = {
     username: 'john_doe',
     email: 'john@example.com',
     age: 30,
     active: true,
     };

     UserModel.save(newUser)
     .then((result) => {
     console.log(result);
     })
     .catch((error) => {
     console.error(error);
     });
     ```

   - **Find Data**:

     ```javascript
     UserModel.find({ username: 'john_doe' })
     .then((result) => {
     console.log(result);
     })
     .catch((error) => {
     console.error(error);
     });
     ```

   - **Update Data**:

     ```javascript
     const query = { username: 'john_doe' };
     const updates = { age: 31 };

     UserModel.update(query, updates)
     .then((result) => {
     console.log(result);
     })
     .catch((error) => {
     console.error(error);
     });
     ```

   - **Delete Data**:

     ```javascript
     const query = { username: 'john_doe' };

     UserModel.delete(query)
     .then((result) => {
     console.log(result);
     })
     .catch((error) => {
     console.error(error);
     });
     ```

   These operations allow you to interact with your data using the defined data model.

4. **Data Validation**:

   jsonverse performs basic data validation based on your schema when saving data. If the data doesn't match the schema, it will throw an error.

5. **Model Usage**:

   You can use your defined data models across your application to ensure consistency in your data structure.

That's the core concept of data models in jsonverse. They help you define and manage your data structure, making it easier to work with and ensuring data integrity.
