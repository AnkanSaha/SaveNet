// Global variables
const AuthModel = require("../Database/Auth/MongoAuthModel");
const mongoose = require("mongoose");
const MongoDBauthUrl = require("../Database/MongoDB_Config.js");
const Backup = require("../backup/BackupConfig");

//Registration
async function Registration(Name, Email, Country, Password, res, Device_info) {
  let { v1: uuidv1, v4: uuidv4 } = require("uuid");
  let UniqueAccountID = uuidv4();
  try {
    await mongoose.connect(MongoDBauthUrl);
    var tempdata = {
      Account_ID: UniqueAccountID,
      Name: Name,
      Email: Email,
      Country: Country,
      Password: Password,
      IsPaid: false,
      Account_Create_Date: new Date(),
      Account_Create_Time_Device_Info: Device_info,
    };
    var Registration = new AuthModel.AuthScheema(tempdata);
    try {
      var result = await AuthModel.AuthScheema.find({ Email: Email });
      console.log(result);
      if (result == "") {
        try {
          var AccountID = await AuthModel.AuthScheema.find({
            Account_ID: UniqueAccountID,
          });
          console.log(AccountID);
          if (AccountID == UniqueAccountID) {
            UniqueAccountID = uuidv4();
            res.status(404).json({
              status: "Unable To Register, Please Try Again",
            });
          } else if (AccountID != UniqueAccountID) {
            console.log("Account ID is Unique");
            await Registration.save();
            Backup.Registration(tempdata, UniqueAccountID);
            console.log("Credential Saved");
            res.status(200).json({
              status: "User Successfully Registered",
              AccountID: UniqueAccountID,
            });
          }
        } catch {
          res
            .status(404)
            .json({ status: "Unable To Register, Please Try Again" });
        }
      } else if (result != "") {
        res
          .status(200)
          .json({
            status: "User Already Exist with this details, Please Login 😃",
            AccountID: result[0].Account_ID,
          });
      }
    } catch {
      res.status(402).json({ status: "Unable To Register, Please Try Again" });
    }
  } catch {
    res.status(502).json({ status: "Internal Server Error" });
  }
}

// login
async function login(Email, Password, res) {
  try {
    await mongoose.connect(MongoDBauthUrl);
    var loginresult = await AuthModel.AuthScheema.find({
      Email: Email,
      Password: Password,
    });
    if (loginresult == "") {
      res.status(404).json({ status: "User Not Registered" });
      mongoose.connection.close();
    } else if (loginresult != "") {
      Backup.Login(loginresult[0]);
      res.status(200).json({ status: loginresult });
      mongoose.connection.close();
    }
  } catch {
    console.log("Unknown Error Arrived");
    res.status(500).json({ status: "Internal Server Error" });
  }
}
module.exports.Registration = Registration;
module.exports.login = login;