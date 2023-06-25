const mongoose = require("mongoose");
var DataQuery = {
    Name: String,
    Email: String,
    Account_ID: String,
    Title: String,
    Description: String,
    Date: String,
}
var QueryScheema = mongoose.Schema(DataQuery);
module.exports.Query = mongoose.model("Data", DataQuery);