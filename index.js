/*!
 * 
 * Copyright(c) 2023 Mark Maher Ewdia
 * MIT Licensed
 */

'use strict';

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
const currentTime = currentDate.replace(/\D/g, ''); // Remove non-numeric characters

class jsonverse {
  constructor(dataFolderPath, activateLogs) {
    this.dataFolderPath = dataFolderPath;
    this.logFolderPath = path.join("./Logs");
    this.backupFolderPath = path.join(this.dataFolderPath, "Backup");
    this.logFilePath = path.join(this.logFolderPath, "app.log");
    this.enableLogToConsoleAndFile = activateLogs;
    this.init();
    this.searchIndex = {};
  }

  async logToConsoleAndFile(message) {
    // Function to remove ANSI escape codes from a string
    function removeAnsiEscapeCodes(input) {
      return input.replace(/\x1b\[\d+m/g, '');
    }
  
    // Log to the file
    const logFilePath = path.join(this.logFolderPath, "app.log");
  
    if (this.enableLogToConsoleAndFile) {
      try {
        console.log(message);
        await fs.mkdir(this.logFolderPath, { recursive: true });
        await fs.appendFile(logFilePath, `${currentDate} ${removeAnsiEscapeCodes(message)}\n`, "utf8");
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir(this.logFolderPath, { recursive: true });
          await fs.writeFile(logFilePath, `${removeAnsiEscapeCodes(message)}\n`, "utf8");
        } else {
          console.log(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Failed to save the logs: ${error}`
          );
        }
      }
    } else {
      console.log(message);
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
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data backup created: ${backupFileName}`
        );
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir("./Data/Backup", { recursive: true });
          try {
            await fs.writeFile(
              backupFilePath,
              JSON.stringify(currentData, null, 2),
              "utf8"
            );
            this.logToConsoleAndFile(
              `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data backup created: ${backupFileName}`
            );
          } catch (readError) {
            this.logToConsoleAndFile(
              `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Failed to create data backup for ${dataName}: ${readError}`
            );
            return null;
          }
        } else {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Failed to create data backup for ${dataName}: ${error}`
          );
          return null;
        }
      }
    } else {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Failed to create data backup for ${dataName}`
      );
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
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data restored from backup: ${backupFileName}`
      );
    } catch (error) {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Failed to restore data from backup: ${backupFileName}: ${error}`
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
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Backup deleted: ${backupFile}`
          );
        } catch (deleteError) {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Failed to delete backup: ${backupFile}: ${deleteError}`
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
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} The path "${this.dataFolderPath}" doesn't exist.`
      );
      const answer = await this.askForConfirmation(
        `${colors.bright}${colors.fg.yellow}[Question]:${colors.reset} Do you want to create the path folder? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.mkdir(this.dataFolderPath, { recursive: true });
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Path folder created successfully.`
          );
        } catch (error) {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Creating path folder: ${error}`
          );
        }
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.red}[Info]:${colors.reset} Path folder not created.`
        );
      }
    }

    return this.dataFolderPath;
  }

  async initFile(filePath) {
    try {
      await fs.access(filePath);
    } catch (error) {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} The file "${filePath}" doesn't exist.`
      );
      const answer = await this.askForConfirmation(
        `${colors.bright}${colors.fg.yellow}[Question]:${colors.reset} Do you want to create the file? (Y/N): `
      );

      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          await fs.writeFile(filePath, "[]");
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} File created successfully.`
          );
        } catch (error) {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Creating file: ${error}`
          );
        }
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.red}[Info]:${colors.reset} File not created.`
        );
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
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data exported to JSON: ${filePath}`
      );
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
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data exported to CSV: ${filePath}`
      );
    }
  }

  // Import Data
  async importData(dataName, format = "json", filePath) {
    if (format === "json") {
      // Import JSON
      const rawData = await fs.readFile(filePath, "utf8");
      const newData = JSON.parse(rawData);
      await this.writeDataByFileName(dataName, newData);
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data imported from JSON: ${filePath}`
      );
    } else if (format === "csv") {
      // Import CSV
      const csvData = await this.readCSV(filePath);
      await this.writeDataByFileName(dataName, csvData);
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data imported from CSV: ${filePath}`
      );
    }
  }

  // Data Transformation (if needed)
  async transformData(dataName, transformFunction) {
    const data = await this.readData(dataName);
    const transformedData = data.map(transformFunction);
    await this.writeDataByFileName(dataName, transformedData);
    this.logToConsoleAndFile(
      `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Data transformed and saved.`
    );
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

  async readData(dataName) {
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
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Initializing file: ${initError}`
          );
        });
        // Retry reading the file
        try {
          const newData = await fs.readFile(filePath, "utf8");
          if (newData.trim() === "") {
            return [];
          }
          return JSON.parse(newData);
        } catch (readError) {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Reading file ${filePath}: ${readError}`
          );
          return null;
        }
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Reading file ${filePath}: ${error}`
        );
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
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Writing to file ${filePath}: ${error}`
      );
    }
  }

  async writeDataById(id, newData) {
    const filePath = this.findByID(id);
    try {
      await fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (error) {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Writing to item with ID: ${filePath}: ${error}`
      );
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
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Item with ID ${id} has been edited.`
        );
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.red}[Info]:${colors.reset} Item with ID ${id} not found.`
        );
      }
    }
  }

  // Add Data
  async saveData(dataName, newData) {
    const existingData = await this.readData(dataName);
    if (existingData !== null) {
      const newId = await this.randomID();

      const newDataWithId = {
        id: newId,
        ...newData,
      };

      existingData.unshift(newDataWithId);

      await this.writeDataByFileName(dataName, existingData).then(() => {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} New Data added to DB: ${dataName}`
        );
      });
    } else {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Data failed to be added to the DB: ${dataName}`
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

        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Item has been deleted.`
        );
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.red}[Info]:${colors.reset} Deleted item:`,
          dataItemToDelete
        );

        if (typeof window == "undefined") {
          this.logToConsoleAndFile(
            `${colors.bright}${colors.fg.green}[Successful]:${colors.reset} Item Deleted successfully!`
          );
        }
      } else {
        this.logToConsoleAndFile(
          `${colors.bright}${colors.fg.red}[Info]:${colors.reset} Item is already deleted.`
        );
      }
    } catch (error) {
      this.logToConsoleAndFile(
        `${colors.bright}${colors.fg.red}[Error]:${colors.reset} Deleting data:`,
        error
      );
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
