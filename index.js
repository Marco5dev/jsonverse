/*!
 *
 * Copyright(c) 2023 Mark Maher Ewida
 * MIT Licensed
 */

"use strict";

const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");
const csv = require("csv-parser");
const crypto = require("crypto-js");
const Fuse = require("fuse.js");
const colors = require("./lib/colors");

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

const currentDate = formatDateTime(new Date());
const currentTime = currentDate.replace(/\D/g, ""); // Remove non-numeric characters

class jsonverse {
  constructor(options) {
    // Default configuration options
    const defaultOptions = {
      dataFolderPath: "./Data",
      logFolderPath: "./Logs",
      activateLogs: true,
    };

    // Merge the default options with the provided options
    this.options = { ...defaultOptions, ...options };

    this.dataFolderPath = this.options.dataFolderPath;
    this.logFolderPath = path.join(this.options.logFolderPath);
    this.backupFolderPath = path.join(this.dataFolderPath, "Backup");
    this.logFilePath = path.join(this.logFolderPath, "data.log");
    this.enableLogToConsoleAndFile = this.options.activateLogs;
    this.searchIndex = {};
    this.cache = {};

    this.init();
  }

  async logToConsoleAndFile(message) {
    // Function to remove ANSI escape codes from a string
    function removeAnsiEscapeCodes(input) {
      return input.replace(/\x1b\[\d+m/g, "");
    }

    // Log to the file
    const logFilePath = path.join(this.logFolderPath, "app.log");
    try {
      await fs.mkdir(this.logFolderPath, { recursive: true });
      await fs.appendFile(
        logFilePath,
        `${currentDate} ${removeAnsiEscapeCodes(message)}\n`,
        "utf8"
      );
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.mkdir(this.logFolderPath, { recursive: true });
        try {
          await fs.writeFile(
            logFilePath,
            `${removeAnsiEscapeCodes(message)}\n`,
            "utf8"
          );
        } catch (readError) {
          this.logError(`Failed to create log file: ${readError}`);
        }
      } else {
        this.logError(`Failed to save logs: ${error}`);
      }
    }
  }

  logError(message) {
    if (this.enableLogToConsoleAndFile) {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} ${message}`
      );
      console.log(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} ${message}`
      );
    } else {
      console.log(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} ${message}`
      );
    }
  }

  logSuccess(message) {
    if (this.enableLogToConsoleAndFile) {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} ${message}`
      );
      console.log(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} ${message}`
      );
    } else {
      console.log(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} ${message}`
      );
    }
  }



  // Encrypt sensitive data
  encrypt(data, secretKey) {
    const encryptedData = crypto.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  }

  // Decrypt sensitive data
  decrypt(encryptedData, secretKey) {
    const decryptedData = crypto.AES.decrypt(encryptedData, secretKey).toString(
      crypto.enc.Utf8
    );
    return JSON.parse(decryptedData);
  }

  // Create Data Backup
  async backupCreate(dataName) {
    const currentData = await this.readData(dataName);
    if (currentData !== null) {
      const backupFileName = `./Backup/${dataName}_${currentTime}.json`;
      const backupFilePath = path.join(this.dataFolderPath, backupFileName);
      try {
        await fs.writeFile(
          backupFilePath,
          JSON.stringify(currentData, null, 2),
          "utf8"
        );
        this.logSuccess(`Data backup created: ${backupFileName}`);
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir("./Data/Backup", { recursive: true });
          try {
            await fs.writeFile(
              backupFilePath,
              JSON.stringify(currentData, null, 2),
              "utf8"
            );
            this.logSuccess(`Data backup created: ${backupFileName}`);
          } catch (readError) {
            this.logError(
              `Failed to create data backup for ${dataName}: ${readError}`
            );
            return null;
          }
        } else {
          this.logError(
            `Failed to create data backup for ${dataName}: ${error}`
          );
          return null;
        }
      }
    } else {
      this.logError(`Failed to create data backup for ${dataName}`);
    }
  }

  // Restore Data from Backup
  async backupRestore(dataName, backupFileName) {
    const backupFilePath = path.join(
      this.dataFolderPath + "/Backup",
      backupFileName + ".json"
    );
    try {
      const backupData = await fs.readFile(backupFilePath, "utf8");
      await this.writeDataByFileName(dataName, JSON.parse(backupData)); // Replace data in the file
      this.logSuccess(`Data restored from backup: ${backupFileName}`);
    } catch (error) {
      this.logError(
        `Failed to restore data from backup: ${backupFileName}: ${error}`
      );
    }
  }

  // Cleanup Old Backups
  async backupDelete(dataName, retentionDays) {
    const backupFiles = await this.getBackupFiles(dataName);
    const currentDate = new Date(currentTime);

    for (const backupFile of backupFiles) {
      const backupDateStr = backupFile
        .split(dataName + "_")[1]
        .split(".json")[0];
      const year = parseInt(backupDateStr.slice(0, 4));
      const month = parseInt(backupDateStr.slice(4, 6)) - 1; // Months are 0-indexed
      const day = parseInt(backupDateStr.slice(6, 8));
      const hour = parseInt(backupDateStr.slice(8, 10));
      const minute = parseInt(backupDateStr.slice(10, 12));
      const second = parseInt(backupDateStr.slice(12, 14));

      const backupDate = new Date(year, month, day, hour, minute, second);

      if (backupDate > retentionDays) {
        const backupFilePath = path.join(
          this.dataFolderPath + "/Backup",
          backupFile
        );
        try {
          await fs.unlink(backupFilePath);
          this.logSuccess(`Backup deleted: ${backupFile}`);
        } catch (deleteError) {
          this.logError(
            `Failed to delete backup: ${backupFile}: ${deleteError}`
          );
        }
      }
    }
  }

  // Get Backup Files
  async getBackupFiles(dataName) {
    const files = await fs.readdir(this.dataFolderPath + "/Backup");
    const backupFiles = files.filter((file) => file.startsWith(`${dataName}_`));
    return backupFiles;
  }

  // Initialize search index for a dataName
  initSearchIndex(dataName, options) {
    const data = this.readData(dataName);
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
      this.logError(`The path "${this.dataFolderPath}" doesn't exist.`);
      const answer = await this.askForConfirmation(
        `Do you want to create the path folder? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.mkdir(this.dataFolderPath, { recursive: true });
          this.logSuccess(`Path folder created successfully.`);
        } catch (error) {
          this.logError(`Creating path folder: ${error}`);
        }
      } else {
        this.logError(`Path folder not created.`);
      }
    }
  }

  async initFile(filePath) {
    try {
      await fs.access(filePath);
    } catch (error) {
      this.logError(`The file "${filePath}" doesn't exist.`);
      const answer = await this.askForConfirmation(
        `${colors.bright}${colors.fg.yellow}[Question]:${colors.reset} Do you want to create the file? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.writeFile(filePath, "[]");
          this.logSuccess(`File created successfully.`);
        } catch (error) {
          this.logError(`Creating file: ${error}`);
        }
      } else {
        this.logError(`File not created.`);
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
    const data = await this.readData(dataName);

    if (format === "json") {
      // Export as JSON
      const filePath = this.getFilePath(dataName + ".json");
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      this.logSuccess(`Data exported to JSON: ${filePath}`);
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
      this.logSuccess(`Data exported to CSV: ${filePath}`);
    }
  }

  // Import Data
  async importData(dataName, format = "json", filePath) {
    if (format === "json") {
      // Import JSON
      const rawData = await fs.readFile(filePath, "utf8");
      const newData = JSON.parse(rawData);
      await this.writeDataByFileName(dataName, newData);
      this.logSuccess(`Data imported from JSON: ${filePath}`);
    } else if (format === "csv") {
      // Import CSV
      const csvData = await this.readCSV(filePath);
      await this.writeDataByFileName(dataName, csvData);
      this.logSuccess(`Data imported from CSV: ${filePath}`);
    }
  }

  // Data Transformation (if needed)
  async transformData(dataName, transformFunction) {
    const data = await this.readData(dataName);
    const transformedData = data.map(transformFunction);
    await this.writeDataByFileName(dataName, transformedData);
    this.logSuccess(`Data transformed and saved.`);
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

  isCacheExpired(dataName) {
    const CACHE_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (
      this.cache[dataName] &&
      Date.now() - this.cache[dataName].timestamp > CACHE_EXPIRATION_TIME
    ) {
      // Cache has expired
      return true;
    }

    return false;
  }

  getFilePath(dataName) {
    return path.join(this.dataFolderPath, `${dataName}.json`);
  }

  async readData(dataName) {
    const filePath = await this.getFilePath(dataName);

    // Check if data is already in the cache and not expired
    if (this.cache[dataName] && !this.isCacheExpired(dataName)) {
      return this.cache[dataName].data;
    }

    try {
      const data = await fs.readFile(filePath, "utf8");
      if (data.trim() === "") {
        return [];
      }

      // Parse and cache the data with a timestamp
      const parsedData = JSON.parse(data);
      this.cache[dataName] = {
        data: parsedData,
        timestamp: Date.now(),
      };

      return parsedData;
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.initFile(filePath).catch((initError) => {
          this.logError(`Initializing file: ${initError}`);
        });
        // Retry reading the file
        try {
          const newData = await fs.readFile(filePath, "utf8");
          if (newData.trim() === "") {
            return [];
          }
          return JSON.parse(newData);
        } catch (readError) {
          this.logError(`Reading file ${filePath}: ${readError}`);
          return null;
        }
      } else {
        this.logError(`Reading file ${filePath}: ${error}`);
        return null;
      }
    }
  }

  async findByID(id) {
    const allData = await this.allData();
    return allData.find((dataItem) => dataItem.id === id);
  }

  async writeDataByFileName(dataName, newData) {
    const filePath = this.getFilePath(dataName);
    try {
      let existingData = await this.readData(dataName);

      if (existingData === null) {
        existingData = [];
      }

      existingData.push(...newData);
      await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (error) {
      this.logError(`Writing to file ${filePath}: ${error}`);
    }
    // Invalidate the cache for this data name
    delete this.cache[dataName];
  }

  async writeDataById(id, newData) {
    const filePath = this.findByID(id);
    try {
      await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (error) {
      this.logError(`Writing to item with ID: ${filePath}: ${error}`);
    }
  }

  async editByID(id, updatedData) {
    // Read existing data from the file
    const existingData = await this.findByID(id);

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
        this.logSuccess(`Item with ID ${id} has been edited.`);
      } else {
        this.logError(`Item with ID ${id} not found.`);
      }
    }
  }

  // Add Data
  async saveData(dataName, newData) {
    try {
      const existingData = (await this.readData(dataName)) || [];
      const newId = await this.randomID();
      const newDataWithId = {
        id: newId,
        ...newData,
      };

      // Remove any existing data with the same ID
      const updatedData = existingData.filter((item) => item.id !== newId);

      // Add the new data with the same ID
      updatedData.push(newDataWithId);

      // Write the updated data to the file
      await this.writeDataByFileName(dataName, updatedData);

      this.logSuccess(`Data updated in DB: ${dataName}`);
    } catch (error) {
      this.logError(
        `Failed to update data in DB: ${dataName}\nError: ${error}`
      );
    }
  }

  async delByID(id) {
    try {
      const dataItemToDelete = await this.findByID(id);

      if (dataItemToDelete) {
        const date = new Date(dataItemToDelete.date);
        const dataName = `${date.getFullYear()}`;
        const data = await this.readData(dataName);
        const newData = data.filter((item) => item.id !== id);
        await this.writeDataByFileName(dataName, newData);

        this.logSuccess(`Item has been deleted.`);
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.blue}[Info]:${colors.reset} Deleted item:`,
          dataItemToDelete
        );

        if (typeof window == "undefined") {
          this.logSuccess(`Item Deleted successfully!`);
        }
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.blue}[Info]:${colors.reset} Item is already deleted.`
        );
      }
    } catch (error) {
      this.logError(`Deleting data:`, error);
    }
  }

  async delByDataName(dataName, id) {
    try {
      // Read the data from the specified JSON file
      const data = await this.readData(dataName);

      if (data) {
        // Find the item with the specified ID
        const itemToDelete = data.find((item) => item.id === id);

        if (itemToDelete) {
          // Filter out the item with the matching ID
          const newData = data.filter((item) => item.id !== id);

          // Write the updated data back to the JSON file
          await this.writeDataByFileName(dataName, newData);

          this.logSuccess(
            `Item with ID ${id} has been deleted from ${dataName}.json`
          );
        } else {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.blue}[Info]:${colors.reset} Item with ID ${id} not found in ${dataName}.json.`
          );
        }
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.blue}[Info]:${colors.reset} No data found in ${dataName}.json.`
        );
      }
    } catch (error) {
      this.logError(`Deleting data:`, error);
    }
  }

  async allData() {
    const files = await fs.readdir(this.dataFolderPath);
    const allData = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const dataName = file.slice(0, -5);
        const data = await this.readData(dataName);

        if (Array.isArray(data) && data.length > 0) {
          allData.push(...data);
        }
      }
    }

    return allData;
  }
}

module.exports = jsonverse;
