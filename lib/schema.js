/*!
 *
 * Copyright(c) 2023 Mark Maher Ewida(Marco5dev)
 * MIT Licensed
 */

"use strict";

class Schema {
  constructor(fields) {
    this.fields = fields;
  }

  validate(data) {
    const errors = {};

    for (const field in this.fields) {
      const fieldConfig = this.fields[field];
      const fieldType = fieldConfig.type;
      const value = data[field];

      if (fieldConfig.required && (value === undefined || value === null)) {
        errors[field] = "This field is required.";
      } else if (fieldType === "string" && typeof value !== "string") {
        errors[field] = `Invalid type. Expected String, got ${typeof value}.`;
      } else if (fieldType === "number" && typeof value !== "number") {
        errors[field] = `Invalid type. Expected Number, got ${typeof value}.`;
      } else if (
        fieldType.type === "string" &&
        fieldType.minlength &&
        value.length < fieldType.minlength
      ) {
        errors[
          field
        ] = `Invalid length. Minimum length is ${fieldType.minlength}.`;
      } else if (
        fieldType.type === "string" &&
        fieldType.maxlength &&
        value.length > fieldType.maxlength
      ) {
        errors[
          field
        ] = `Invalid length. Maximum length is ${fieldType.maxlength}.`;
      } else if (
        fieldType.type === "number" &&
        fieldType.min &&
        value < fieldType.min
      ) {
        errors[
          field
        ] = `Value should be greater than or equal to ${fieldType.min}.`;
      } else if (
        fieldType.type === "number" &&
        fieldType.max &&
        value > fieldType.max
      ) {
        errors[
          field
        ] = `Value should be less than or equal to ${fieldType.max}.`;
      } else if (
        fieldType.validate &&
        typeof fieldType.validate === "function" &&
        !fieldType.validate(value)
      ) {
        errors[field] = "Invalid value.";
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}

module.exports = Schema;
