class Model {
  constructor(dataName, schemaDefinition) {
    this.dataName = dataName;
    this.schemaDefinition = schemaDefinition;
    this.init();
  }

  init() {
    // Initialize the schema in Jsonverse
    Jsonverse.schemas[this.dataName] = {
      schemaDefinition: this.schemaDefinition,
    };
  }

  async save(data) {
    // Validate the data against the schema
    const schemaDefinition = this.schemaDefinition;
    const keys = Object.keys(schemaDefinition);

    for (const key of keys) {
      if (
        schemaDefinition[key] &&
        schemaDefinition[key].type &&
        typeof schemaDefinition[key].type === "function"
      ) {
        if (!(data[key] instanceof schemaDefinition[key].type)) {
          throw new Error(`Invalid data type for field: ${key}`);
        }
      }
    }

    // Save the data to the database using jsonverse.saveData
    try {
      await Jsonverse.saveData(this.dataName, data);
      return Promise.resolve(`${this.dataName} saved successfully`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(query) {
    try {
      await Jsonverse.deleteData(this.dataName, query);
      return Promise.resolve(`${this.dataName} deleted successfully`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(query, updates) {
    try {
      await Jsonverse.updateData(this.dataName, query, updates);
      return Promise.resolve(`${this.dataName} updated successfully`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async find(query) {
    try {
      const result = await Jsonverse.find(this.dataName, query);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Model;