// * Dependencies
const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");
// const winston = require("winston");
const csv = require("csv-parser");
const crypto = require("crypto-js");
const dateFormat = require("dateformat");
const Fuse = require("fuse.js");
const colors = require("./lib/colors")

class jsonverse {
  constructor(dataFolderPath) {
    this.dataFolderPath = dataFolderPath;
    this.init();
    this.searchIndex = {};
  }

  // Encrypt sensitive data
  encryptData(data, secretKey) {
    const encryptedData = crypto.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  }

  // Decrypt sensitive data
  decryptData(encryptedData, secretKey) {
    const decryptedData = crypto.AES.decrypt(encryptedData, secretKey).toString(
      crypto.enc.Utf8
    );
    return JSON.parse(decryptedData);
  }

  // Create Data Backup
  async createDataBackup(dataName) {
    const currentData = await this.readDataFromFile(dataName);
    if (currentData !== null) {
      const backupFileName = `${dataName}_${dateFormat(
        new Date(),
        "yyyymmddHHMMss"
      )}.json`;
      const backupFilePath = path.join(this.dataFolderPath, backupFileName);
      await fs.writeFile(
        backupFilePath,
        JSON.stringify(currentData, null, 2),
        "utf8"
      );
      console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data backup created: ${backupFileName}`);
    } else {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}Failed to create data backup for ${dataName}`);
    }
  }

  // Restore Data from Backup
  async restoreDataFromBackup(dataName, backupFileName) {
    const backupFilePath = path.join(this.dataFolderPath, backupFileName);
    try {
      const backupData = await fs.readFile(backupFilePath, "utf8");
      await this.writeDataByFileName(dataName, JSON.parse(backupData));
      console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data restored from backup: ${backupFileName}`);
    } catch (error) {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}Failed to restore data from backup: ${backupFileName}`);
    }
  }

  // Cleanup Old Backups
  async cleanupOldBackups(dataName, retentionDays) {
    const backupFiles = await this.getBackupFiles(dataName);
    const currentDate = new Date();

    for (const backupFile of backupFiles) {
      const backupDateStr = backupFile.split("_")[1].split(".")[0];
      const backupDate = dateFormat(backupDateStr, "yyyymmddHHMMss");
      const diffInDays =
        (currentDate - new Date(backupDate)) / (1000 * 60 * 60 * 24);

      if (diffInDays > retentionDays) {
        const backupFilePath = path.join(this.dataFolderPath, backupFile);
        await fs.unlink(backupFilePath);
        console.log(`${colors.fg.green}[Successful]: ${colors.reset}Backup deleted: ${backupFile}`);
      }
    }
  }

  // Get Backup Files
  async getBackupFiles(dataName) {
    const files = await fs.readdir(this.dataFolderPath);
    const backupFiles = files.filter((file) => file.startsWith(`${dataName}_`));
    return backupFiles;
  }

  // Initialize search index for a dataName
  initSearchIndex(dataName, options) {
    const data = this.readDataFromFile(dataName);
    if (data !== null) {
      const fuse = new Fuse(data, options);
      this.searchIndex[dataName] = fuse;
    }
  }

  // Search data by query
  searchData(dataName, query) {
    if (this.searchIndex[dataName]) {
      const fuse = this.searchIndex[dataName];
      return fuse.search(query);
    } else {
      return [];
    }
  }

  async init() {
    try {
      await fs.access(this.dataFolderPath);
    } catch (error) {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}The path "${this.dataFolderPath}" doesn't exist.`);
      const answer = await this.askForConfirmation(
        `${colors.fg.yellow}[Question]: ${colors.reset}Do you want to create the path folder? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.mkdir(this.dataFolderPath, { recursive: true });
          console.log(`${colors.fg.green}[Successful]: ${colors.reset}Path folder created successfully.`);
        } catch (error) {
          console.log(`${colors.fg.red}[Error]: ${colors.reset}Creating path folder: ${error}`);
        }
      } else {
        console.log(`${colors.fg.blue}[Info]: ${colors.reset}Path folder not created.`);
      }
    }

    return this.dataFolderPath;
  }

  async initFile(filePath) {
    try {
      await fs.access(filePath);
    } catch (error) {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}The file "${filePath}" doesn't exist.`);
      const answer = await this.askForConfirmation(
        `${colors.fg.yellow}[Question]: ${colors.reset}Do you want to create the file? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.writeFile(filePath, "[]");
          console.log(`${colors.fg.green}[Successful]: ${colors.reset}File created successfully.`);
        } catch (error) {
          console.log(`${colors.fg.red}[Error]: ${colors.reset}Creating file: ${error}`);
        }
      } else {
        console.log(`${colors.fg.blue}[Info]: ${colors.reset}File not created.`);
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

  // Export Data
  async exportData(dataName, format = "json") {
    const data = await this.readDataFromFile(dataName);

    if (format === "json") {
      // Export as JSON
      const filePath = this.getFilePath(dataName + ".json");
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data exported to JSON: ${filePath}`);
    } else if (format === "csv") {
      // Export as CSV
      const filePath = this.getFilePath(dataName + ".csv");
      const csvData = data.map((item) => {
        return {
          id: item.id,
          ...item, // Include other properties in CSV
        };
      });
      const csvString = await this.convertToCSV(csvData);
      await fs.writeFile(filePath, csvString, "utf8");
      console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data exported to CSV: ${filePath}`);
    }
  }

  // Import Data
  async importData(dataName, format = "json", filePath) {
    if (format === "json") {
      // Import JSON
      const rawData = await fs.readFile(filePath, "utf8");
      const newData = JSON.parse(rawData);
      await this.writeDataByFileName(dataName, newData);
      console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data imported from JSON: ${filePath}`);
    } else if (format === "csv") {
      // Import CSV
      const csvData = await this.readCSV(filePath);
      await this.writeDataByFileName(dataName, csvData);
      console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data imported from CSV: ${filePath}`);
    }
  }

  // Data Transformation (if needed)
  async transformData(dataName, transformFunction) {
    const data = await this.readDataFromFile(dataName);
    const transformedData = data.map(transformFunction);
    await this.writeDataByFileName(dataName, transformedData);
    console.log(`${colors.fg.green}[Successful]: ${colors.reset}Data transformed and saved.`);
  }

  // Helper method to convert data to CSV
  async convertToCSV(data) {
    const { Parser } = require("json2csv");
    const parser = new Parser();
    return parser.parse(data);
  }

  // Helper method to read CSV
  async readCSV(filePath) {
    const results = [];
    const stream = fs.createReadStream(filePath).pipe(csv());
    return new Promise((resolve, reject) => {
      stream
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  }

  getFilePath(dataName) {
    return path.join(this.dataFolderPath, `${dataName}.json`);
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
      if (error.code === "ENOENT") {
        await this.initFile(filePath).catch((initError) => {
          console.log(`${colors.fg.red}[Error]: ${colors.reset}Initializing file: ${initError}`);
        });
        // Retry reading the file
        try {
          const newData = await fs.readFile(filePath, "utf8");
          if (newData.trim() === "") {
            return [];
          }
          return JSON.parse(newData);
        } catch (readError) {
          console.log(`${colors.fg.red}[Error]: ${colors.reset}Reading file ${filePath}: ${readError}`);
          return null;
        }
      } else {
        console.log(`${colors.fg.red}[Error]: ${colors.reset}Reading file ${filePath}: ${error}`);
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
      console.log(`${colors.fg.red}[Error]: ${colors.reset}Writing to file ${filePath}: ${error}`);
    }
  }

  async writeDataById(id, newData) {
    const filePath = this.findDataById(id);
    try {
      await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (error) {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}Writing to item with ID: ${filePath}: ${error}`);
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
        console.log(`${colors.fg.green}[Successful]: ${colors.reset}Item with ID ${id} has been edited.`);
      } else {
        console.log(`${colors.fg.blue}[Info]: ${colors.reset}Item with ID ${id} not found.`);
      }
    }
  }

  // Add Data
  async addData(dataName, newData) {
    const existingData = await this.readDataFromFile(dataName);
    if (existingData !== null) {
      const newId = await this.randomID();

      const newDataWithId = {
        id: newId,
        ...newData,
      };

      existingData.unshift(newDataWithId);

      await this.writeDataByFileName(dataName, existingData).then(() => {
        console.log(`${colors.fg.green}[Successful]: ${colors.reset}New Data added to DB: ${dataName}`);
      });
    } else {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}Data failed to be added to the DB: ${dataName}`);
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

        console.log(`${colors.fg.green}[Successful]: ${colors.reset}Item has been deleted.`);
        console.log(`${colors.fg.blue}[Info]: ${colors.reset}Deleted item:`, dataItemToDelete);

        if (typeof window == "undefined") {
          console.log(`${colors.fg.green}[Successful]: ${colors.reset}Item Deleted successfully!`);
        }
      } else {
        console.log(`${colors.fg.blue}[Info]: ${colors.reset}Item is already deleted.`);
      }
    } catch (error) {
      console.log(`${colors.fg.red}[Error]: ${colors.reset}Deleting data:`, error);
    }
  }

  async getAllData() {
    const files = await fs.readdir(this.dataFolderPath);
    const allData = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const dataName = file.slice(0, -5);
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
