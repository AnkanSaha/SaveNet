const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const Authentication = require("./Connector/AuthVerify");
// setting up body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "900mb",
    parameterLimit: 10000000,
  })
);
app.use(
  bodyParser.json({ limit: "900mb", parameterLimit: 10000000, extended: true })
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
module.exports = app;
