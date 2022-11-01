// Global variables
const AuthModel = require("../Database/Auth/MongoAuthModel");
const mongoose = require("mongoose");
const MongoDBauthUrl =
  "mongodb+srv://Ankan157:Ankan1567@resultshowdatabse.q1ops.mongodb.net/Authentication?retryWrites=true&w=majority";
const Backup = require("../backup/BackupConfig");

//Registration
function Registration(Name, Email, Country, Password, res, Device_info) {
  let { v1: uuidv1, v4: uuidv4 } = require("uuid");
  let UniqueAccountID = uuidv4();
  mongoose
    .connect(MongoDBauthUrl)
    .then(() => {
      var tempdata = {
        Account_ID: UniqueAccountID,
        Name: Name,
        Email: Email,
        Country: Country,
        Password: Password,
        Account_Create_Date: new Date(),
        Account_Create_Time_Device_Info: Device_info,
      };
      var Registration = new AuthModel.AuthScheema(tempdata);
      AuthModel.AuthScheema.find({ Email: Email })
        .then((result) => {
          console.log(result);
          if (result == "") {
            AuthModel.AuthScheema.find({ Account_ID: UniqueAccountID })
              .then((AccountID) => {
                console.log(AccountID);
                if (AccountID == UniqueAccountID) {
                  UniqueAccountID = uuidv4();
                  res.status(404).json({
                    status: "Unable To Register, Please Try Again",
                  });
                } else if (AccountID != UniqueAccountID) {
                  console.log("Account ID is Unique");
                  Registration.save()
                    .then(() => {
                      Backup.Registration(tempdata, UniqueAccountID);
                      console.log("Credential Saved");
                      res.status(200).json({
                        status: "User Successfully Registered",
                        AccountID: UniqueAccountID,
                      });
                      mongoose.connection.close();
                    })
                    .catch((saveerr) => {
                      console.log(saveerr);
                      res.status(500).json({ status: "Internal Server Error" });
                    });
                }
              })
              .catch((AccountIDerr) => {
                console.log(AccountIDerr);
              });
          } else if (result != "") {
            console.log("User Already Exist");
            res.status(404).json({
              status: "User Already Exist with this details, Please Login 😃",
              AccountID: result[0].Account_ID,
            });
            mongoose.connection.close();
          }
        })
        .catch((finderr) => {
          console.log(finderr);
          res.status(500).json({ status: "Internal Server Error" });
        });
    })
    .catch((conerror) => {
      console.log(conerror);
    });
}

// login
function login(Email, Password, res) {
  mongoose
    .connect(MongoDBauthUrl)
    .then(() => {
      AuthModel.AuthScheema.find({ Email: Email, Password: Password })
        .then((loginresult) => {
          if (loginresult == "") {
            res.status(404).json({ status: "User Not Registered" });
            mongoose.connection.close();
          } else if (loginresult != "") {
            Backup.Login(loginresult[0]);
            res.status(200).json({ status: loginresult });
            mongoose.connection.close();
          }
        })
        .catch((finderror) => {
          console.log(finderror);
        });
    })
    .catch((connectionerror) => {
      console.log(connectionerror);
    });
}
module.exports.Registration = Registration;
module.exports.login = login;
