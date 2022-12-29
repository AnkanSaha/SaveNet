  // importing require modules
const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const routing = require("./route");
const Authentication = require("./AuthRoute");
const DashRoute = require("./ActionRoute.js");
//setting up static folder
app.use(express.static("src"));
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
// setup router feature for api routes
app.use(routing);
app.use(Authentication);
app.use(DashRoute);
//  starting server
app.listen(port,() => {
  console.log(
    `Server is running on port ${port} ` + "& current directory is " + __dirname
  );
});

// view engine setup
app.set('view engine', 'pug')
app.set('views', './src/html')
