const express = require("express");
const Server = express.Router();

// setting up api routes
Server.get("/", (req, res) => {
  res.status(200).sendFile(`home.html`, {root:`./source/static/html/home/`});
});
Server.get("/signup", (req, res) => {
  res.status(200).sendFile(`Signup.html`, {root:`./source/static/html/Auth/`});
});
Server.get("/login", (req, res) => {
  res.status(200).sendFile(`login.html`, {root:`./source/static/html/Auth/`});
});
Server.get("/signedwelcome", (req, res) => {
  res.status(200).sendFile(`preview.html`, {root:`./source/static/html/Auth/`});
});
// sending Dashboard
Server.get('/dashboard', (req, res)=>{
  res.status(200).sendFile(`dashboard.html`, {root:`./source/static/html/Dashboard/`});
});

// exporting server
module.exports = Server;
