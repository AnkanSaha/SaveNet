const express = require('express');
const app = express.Router();
const CurrentDir = `${__dirname}/src/`;
// setting up api routes
app.get('/', (req, res)=>{
    res.status(200).sendFile(`${CurrentDir}html/home/home.html`);
});
app.get('/signup', (req, res)=>{
    res.status(200).sendFile(`${CurrentDir}html/Auth/Signup.html`);
});
app.get('/login', (req, res)=>{
    res.status(200).sendFile(`${CurrentDir}html/Auth/login.html`)
})
module.exports = app;