const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");
const readline = require('readline');
const colors = require('./lib/colors');

class jsonverse {
  constructor(dataFolderPath) {
    this.dataFolderPath = dataFolderPath;
    this.init()
  }

  async init() {
    try {
      await fs.access(this.dataFolderPath);
    } catch (error) {
      console.log(`\x1b[34m[Info]: \x1b[0mThe path "${this.dataFolderPath}" doesn't exist.`);

      const answer = await this.askForConfirmation(
        `\x1b[33m[Question]: \x1b[0mDo you want to create the path folder? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.mkdir(this.dataFolderPath, { recursive: true });
          console.log(`\x1b[32m[Successful]: \x1b[0mPath folder created successfully.`);
        } catch (error) {
          console.error(`\x1b[31m[Error]: \x1b[0mCreating path folder: ${error}`);
        }
      } else {
        console.log(`\x1b[34m[Info]: \x1b[0mPath folder not created.`);
      }
    }

    return this.dataFolderPath; // Return dataFolderPath after initialization
  }

    async initFile(filePath) {
    try {
      await fs.access(filePath);
    } catch (error) {
      console.log(`\x1b[34m[Info]: \x1b[0mThe file "${filePath}" doesn't exist.`);

      const answer = await this.askForConfirmation(
        `\x1b[33m[Question]: \x1b[0mDo you want to create the file? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.writeFile(filePath, "[]");
          console.log(`\x1b[32m[Successful]: \x1b[0mFile created successfully.`);
        } catch (error) {
          console.error(`\x1b[31m[Error]: \x1b[0mCreating file: ${error}`);
        }
      } else {
        console.log(`\x1b[34m[Info]: \x1b[0mFile not created.`);
      }
    }
  }

  async askForConfirmation(question) {
    return new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question(question, (answer) => {
        readline.close();
        resolve(answer);
      });
    });
  }

  async randomID() {
    const uuid = randomUUID();
    const idWithoutHyphens = uuid.replace(/-/g, "");
    return idWithoutHyphens;
  }

  getFilePath(dataName) {
    const filePath = path.join(this.dataFolderPath, `${dataName}.json`);
    // this.initFile(filePath); // Initialize the file if it doesn't exist
    return filePath;
  }

  async readDataFromFile(dataName) {
    const filePath = await this.getFilePath(dataName);
    try {
      const data = await fs.readFile(filePath, "utf8");
      if (data.trim() === "") {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.initFile(filePath).catch(initError => {
          console.error(`\x1b[31m[Error]: \x1b[0mInitializing file: ${initError}`);
        });
        // Retry reading the file
        try {
          const newData = await fs.readFile(filePath, "utf8");
          if (newData.trim() === "") {
            return [];
          }
          return JSON.parse(newData);
        } catch (readError) {
          console.error(`\x1b[31m[Error]: \x1b[0mreading file ${filePath}: ${readError}`);
          return null;
        }
      } else {
        console.error(`\x1b[31m[Error]: \x1b[0mreading file ${filePath}: ${error}`);
        return null;
      }
    }
  }

  async findDataById(id) {
    const allData = await this.getAllData();
    return allData.find((dataItem) => dataItem.id === id);
  }

  async writeDataByFileName(dataName, newData) {
    const filePath = this.getFilePath(dataName);
    try {
      let existingData = await this.readDataFromFile(dataName);

      if (existingData === null) {
        existingData = [];
      }

      existingData.push(...newData);
      await fs.writeFile(
        filePath,
        JSON.stringify(existingData, null, 2),
        "utf8"
      );
    } catch (error) {
      console.error(`\x1b[31m[Error]: \x1b[0mwriting to file ${filePath}: ${error}`);
    }
  }

  async writeDataById(id, newData) {
    const filePath = this.findDataById(id);
    try {
      await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (error) {
      console.error(`\x1b[31m[Error]: \x1b[0mwriting to item with ID: ${filePath}: ${error}`);
    }
  }

  async editData(id, updatedData) {
    // Read existing data from the file
    const existingData = await this.findDataById(id);

    if (existingData) {
      // Find the index of the item with the specified ID
      const itemIndex = existingData.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        // Update the existing data with the new data
        existingData[itemIndex] = {
          ...existingData[itemIndex],
          ...updatedData,
        };
        // Write the updated data back to the file
        await this.writeDataById(id, existingData);
        console.log(`\x1b[32m[Successful]: \x1b[0mItem with ID ${id} has been edited.`);
      } else {
        console.log(`\x1b[34m[Info]: \x1b[0mItem with ID ${id} not found.`);
      }
    }
  }

  // Add Data
  async addData(dataName, newData) {
    const existingData = await this.readDataFromFile(dataName);
    if (existingData !== null) {
      // Generate a random and unique ID
      const newId = await this.randomID();

      // Create a new object with the ID and newData
      const newDataWithId = {
        id: newId,
        ...newData,
      };

      // Insert the newData object with ID at the beginning of the existing data array
      existingData.unshift(newDataWithId);

      await this.writeDataByFileName(dataName, existingData).then(() => {
        console.log(`\x1b[32m[Successful]: \x1b[0mNew Data added to DB: ${dataName}`)
      })
    } else {
      console.error(`\x1b[31m[Error]: \x1b[0m Data failed to be added to the DB: ${dataName}`);
    }
  }

  async deleteDataById(id) {
    try {
      const dataItemToDelete = await this.findDataById(id);

      if (dataItemToDelete) {
        const date = new Date(dataItemToDelete.date);
        const dataName = `${date.getFullYear()}`;
        const data = await this.readDataFromFile(dataName);
        const newData = data.filter((item) => item.id !== id);
        await this.writeDataByFileName(dataName, newData);

        console.log(`\x1b[32m[Successful]: \x1b[0mItem has been deleted.`);
        console.log(`\x1b[32m[Successful]: \x1b[0mDeleted item:`, dataItemToDelete);

        if (typeof window == "undefined") {
          console.log("\x1b[32m[Successful]: \x1b[0mItem Deleted successfully!");
        }
      } else {
        console.log(`\x1b[34m[Info]: \x1b[0mItem is already deleted.`);
      }
    } catch (error) {
      console.error("\x1b[31m[Error]: \x1b[0m deleting data:", error);
    }
  }

  async getAllData() {
    const files = await fs.readdir(this.dataFolderPath);

    const allData = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const dataName = file.slice(6, -5);
        const data = await this.readDataFromFile(dataName);

        if (Array.isArray(data) && data.length > 0) {
          allData.push(...data);
        }
      }
    }

    return allData;
  }
}

module.exports = jsonverse;
