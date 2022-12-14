const express = require("express");
const app = express.Router();
const CurrentDir = `${__dirname}/src/`;
// setting up api routes
app.get("/", (req, res) => {
  res.status(200).sendFile(`${CurrentDir}html/home/home.html`);
});
app.get("/signup", (req, res) => {
  res.status(200).sendFile(`${CurrentDir}html/Auth/Signup.html`);
});
app.get("/login", (req, res) => {
  res.status(200).sendFile(`${CurrentDir}html/Auth/login.html`);
});
app.get("/signedwelcome", (req, res) => {
  res.status(200).sendFile(`${CurrentDir}html/Auth/preview.html`);
});
// sending Dashboard
app.get('/dashboard', (req, res)=>{
  res.status(200).sendFile(`${CurrentDir}html/Dashboard/dashboard.html`);
});
module.exports = app;
