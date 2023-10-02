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
      const fieldType = this.fields[field];
      const value = data[field];

      if (typeof value !== fieldType) {
        errors[
          field
        ] = `Invalid type. Expected ${fieldType}, got ${typeof value}.`;
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}

module.exports = Schema;