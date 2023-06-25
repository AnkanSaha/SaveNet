const express = require("express");
const app = express.Router();
const cors = require("cors");
const Authentication = require("../Functions/AuthVerify");
// setting up body parser
app.use(
  express.urlencoded({
    extended: true,
    limit: "900mb",
    parameterLimit: 10000000,
  })
);
app.use(
  express.json({ limit: "900mb", parameterLimit: 10000000, extended: true })
);
// setting up cors
app.use(
  cors([
    "http://localhost:8000",
    "http://localhost:4000",
    "https://data.theankan.live",
  ])
);
// Create Account
app.post("/CreateUser", (req, res) => {
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Country = req.body.Country;
  var Password = req.body.Password;
  var Device_Info = req.body.Account_Create_Time_Device_Info;
  console.log(Name, Email, Country, Password, Device_Info);
  Authentication.Registration(Name, Email, Country, Password, res, Device_Info);
});
// login
app.post("/CheckUser", (req, res) => {
  var Email = req.body.Email;
  var Password = req.body.Password;
  var AccountID = req.body.AccountID
  Authentication.login(Email, Password, AccountID ,res);
});

// update Account Info

app.put('/updateAccountInfo', (req, res) => {
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Country = req.body.Country;
  var Password = req.body.Password;
  var AccountID = req.body.AccountID;
  var Device_Info = req.body.Account_Create_Time_Device_Info;
  var Account_Create_Time = req.body.AccountCreateDate;
  Authentication.updateAccountInfo(Name, Email, Country, Password, AccountID, Device_Info, Account_Create_Time, res);
})
module.exports = app;
