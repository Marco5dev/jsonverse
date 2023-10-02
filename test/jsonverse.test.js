const { expect } = require("chai");
const jsonverse = require("../index"); // Import the jsonverse module
const fs = require("fs").promises;
const path = require("path");

describe("jsonverse package", () => {
  let dataName = "testData"; // Change this to the actual data name you want to test

  // Helper function to create a new jsonverse instance for testing
  function createJsonverseInstance() {
    return new jsonverse({
      dataFolderPath: "./test/data", // data directory
      logFolderPath: "./test/logs", // logs directory
      activateLogs: true, // to enable the logs set this value to true
    }); // Adjust the folder paths as needed
  }

  before(async () => {
    // Check if the required folders and files exist
    const dataFolderPath = "./test/data";
    const logsFolderPath = "./test/logs";
    const dataFilePath = path.join(dataFolderPath, `${dataName}.json`);

    const [dataFolderExists, logsFolderExists, dataFileExists] =
      await Promise.all([
        fs
          .access(dataFolderPath)
          .then(() => true)
          .catch(() => false),
        fs
          .access(logsFolderPath)
          .then(() => true)
          .catch(() => false),
        fs
          .access(dataFilePath)
          .then(() => true)
          .catch(() => false),
      ]);

    // If any of the required items don't exist, create them
    if (!dataFolderExists) {
      await fs.mkdir(dataFolderPath, { recursive: true });
    }
    if (!logsFolderExists) {
      await fs.mkdir(logsFolderPath, { recursive: true });
    }
    if (!dataFileExists) {
      await fs.writeFile(dataFilePath, "[]", "utf8");
    }
  });

  it("should add Data", async () => {
    const instance = createJsonverseInstance();

    // Test the saveData function with data containing only a name
    const newName = "New Test Item";
    const newData = {
      id: "1234",
      name: newName,
    };

    // Wait for the data to be saved (assuming saveData is an async function)
    await instance.saveData("testData", newData);

    instance.readData("testData").then((result) => {
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result.name === newName);
    });
  });

  it("should delete all items in the data file", async () => {
    const instance = createJsonverseInstance();

    await instance.delByDataName("testData", "1234");

    // Verify that all items were deleted
    const afterDelete = instance.readData("testData");
    expect(afterDelete === "[]"); // Expect an empty array
  });
  after(async () => {
    // Delete test data and logs folders after all tests have run
    const testDataPath = path.join(__dirname, "data");
    const testLogsPath = path.join(__dirname, "logs");

    try {
      // Function to delete a folder recursively
      function deleteFolderRecursive(folderPath) {
        if (fs.existsSync(folderPath)) {
          fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              // Recurse into subfolder
              deleteFolderRecursive(curPath);
            } else {
              // Delete file
              fs.unlinkSync(curPath);
            }
          });
          // Delete the empty folder
          fs.rmdirSync(folderPath);
        }
      }

      // Remove the test data folder and its contents
      deleteFolderRecursive(testDataPath);

      // Remove the test logs folder and its contents
      deleteFolderRecursive(testLogsPath);
    } catch (error) {
      console.error("Error deleting test folders:", error);
    }
  });
});
