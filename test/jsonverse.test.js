const { expect } = require("chai");
const { Schema, jsonverse } = require("../index");
const path = require("path");
const fs = require("fs");

describe("Testing JsonVerse Operation scripts", () => {
  let Users;
  let db;

  // TODO: Disable the log in the console
  // ? do you want to enable console.log again? you can restore the original function:
  // * console.log = originalConsoleLog;
  const originalConsoleLog = console.log;
  console.log = function () {};

  before(async () => {
    db = new jsonverse({
      dataFolderPath: "./test/data", // * data directory
      logFolderPath: "./test/logs", // * logs directory
      activateLogs: true, // * to enable the logs set this value to true
    });

    const userSchema = new Schema({
      id: { type: "string", required: true },
      name: { type: "string", required: true },
      email: { type: "string", required: true },
    });

    Users = db.model("Users", userSchema);
  });

  it("Add data using saveData()", async () => {
    // * Test the saveData function with data containing only a name
    const newName = "New Test Item";
    const newData = {
      id: "1234",
      name: newName,
    };

    // * Wait for the data to be saved (assuming saveData is an async function)
    await db.saveData("testData", newData);

    db.readData("testData").then((result) => {
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result.name === newName);
    });
  });

  it("Delete Data using delByDataName()", async () => {
    await db.delByDataName("testData", "1234");

    // ! Verify that all items were deleted
    const afterDelete = db.readData("testData");
    expect(afterDelete === "[]"); // ? Expect an empty array
  });

  it("Save Data using Schema.save()", async () => {
    Users.save({
      id: "johndoe",
      name: "John Doe",
      email: "john@example.com",
    }).then((result) => {
      expect(result.id).to.equal("johndoe");
      expect(result.name).to.equal("John Doe");
      expect(result.email).to.equal("john@example.com");
    });
  });

  it("Update Data using Schema.update()", async () => {
    Users.save({
      id: "markmaher",
      name: "Mark Maher",
      email: "mark@example.com",
    }).then(() => {
      Users.update("markmaher", {
        name: "Marco Maher",
        email: "marco@maher.com",
      }).then((result) => {
        expect(result.name).to.equal("Marco Maher");
        expect(result.email).to.equal("marco@maher.com");
      });
    });
  });

  it("Delete Data using Schema.delete()", async () => {
    Users.save({
      id: "yousifsamir",
      name: "Yousif Samir",
      email: "yousif@samir.com",
    }).then(() => {
      Users.delete("yousifsamir").then(() => {
        Users.find("yousifsamir").then((result) => {
          expect(result).to.be.null;
        });
      });
    });
  });

  it("Search data using Schema.find(id)", async () => {
    Users.save({
      id: "alicejohnson",
      name: "Alice Johnson",
      email: "alice@example.com",
    }).then((savedUser) => {
      Users.find("alicejohnson").then((result) => {
        expect(result.id).to.equal(savedUser.id);
        expect(result.name).to.equal(savedUser.name);
        expect(result.email).to.equal(savedUser.email);
      });
    });
  });

  it("Read Data from database using Schema.findAll()", async () => {
    const users = [
      {
        id: () => "userOne1",
        name: () => "User One",
        email: () => "userOne@example.com",
      },
      {
        id: () => "userTwo",
        name: () => "User Two",
        email: () => "userTwo@example.com",
      },
    ];

    for (const user of users) {
      await Users.save({
        id: user.id(), // *Note: invoking the function here
        name: user.name(), // *Note: invoking the function here
        email: user.email(), // *Note: invoking the function here
      });
    }

    const allUsers = await Users.findAll();

    expect(allUsers).to.have.lengthOf.at.least(users.length);
    expect(allUsers.every((user) => user.id && user.name && user.email)).to.be
      .true;
  });

  after(async () => {
    // * Delete test data and logs folders after all tests have run
    const testDataPath = path.join(__dirname, "data");
    const testLogsPath = path.join(__dirname, "logs");

    try {
      // ! Function to delete a folder recursively
      function deleteFolderRecursive(folderPath) {
        if (fs.existsSync(folderPath)) {
          fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              // * Recurse into subfolder
              deleteFolderRecursive(curPath);
            } else {
              // * Delete file
              fs.unlinkSync(curPath);
            }
          });
          // * Delete the empty folder
          fs.rmdirSync(folderPath);
        }
      }

      // * Remove the test data folder and its contents
      deleteFolderRecursive(testDataPath);

      // * Remove the test logs folder and its contents
      deleteFolderRecursive(testLogsPath);
    } catch (error) {
      console.error("Error deleting test folders:", error);
    }
  });
});
