const { expect } = require("chai");
const { Schema, jsonverse } = require("./../index");
const path = require("path");
const fs = require("fs");

describe("jsonverse Model", () => {
  var User;

  before(async () => {
    const db = new jsonverse({
      dataFolderPath: "./test/data", // data directory
      logFolderPath: "./test/logs", // logs directory
      activateLogs: true, // to enable the logs set this value to true
    });

    const userSchema = new Schema({
      id: "string",
      name: "string",
      email: "string",
    });

    User = db.model("users", userSchema);
  });

  it("should save user data", async () => {
    User.save({
      id: "johndoe",
      name: "John Doe",
      email: "john@example.com",
    }).then((result) => {
      expect(result.id).to.equal("johndoe");
      expect(result.name).to.equal("John Doe");
      expect(result.email).to.equal("john@example.com");
    });
  });

  it("should update user data", async () => {
    User.save({
      id: "markmaher",
      name: "Mark Maher",
      email: "mark@example.com",
    }).then(() => {
      User.update("markmaher", {
        name: "Marco Maher",
        email: "marco@maher.com",
      }).then((result) => {
        expect(result.name).to.equal("Marco Maher");
        expect(result.email).to.equal("marco@maher.com");
      });
    });
  });

  it("should delete user data", async () => {
    User.save({
      id: "yousifsamir",
      name: "Yousif Samir",
      email: "yousif@samir.com",
    }).then(() => {
      User.delete("yousifsamir").then(() => {
        User.find("yousifsamir").then((result) => {
          expect(result).to.be.null;
        });
      });
    });
  });

  it("should find user data by ID", async () => {
    User.save({
      id: "alicejohnson",
      name: "Alice Johnson",
      email: "alice@example.com",
    }).then(() => {
      User.find("alicejohnson").then((result) => {
        expect(result.id).to.equal(savedUser.id);
        expect(result.name).to.equal(savedUser.name);
        expect(result.email).to.equal(savedUser.email);
      });
    });
  });

  it("should find all users", async () => {
    const users = [
      {
        id: "user1", // Unique ID for user 1
        name: "User 1",
        email: "user1@example.com",
      },
      {
        id: "user2", // Unique ID for user 2
        name: "User 2",
        email: "user2@example.com",
      },
    ];

    for (const user of users) {
      await User.save(user);
    }

    const allUsers = await User.findAll();

    expect(allUsers).to.have.lengthOf.at.least(users.length);
    expect(allUsers.every((user) => user.id && user.name && user.email)).to.be
      .true;
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