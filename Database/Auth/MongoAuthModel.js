const mongoose = require("mongoose");
let AuthScheemaDef = {
  Account_ID: String,
  Name: String,
  Email: String,
  Country: String,
  IsPaid: Boolean,
  Password: String,
  Account_Create_Date: String,
  Account_Create_Time_Device_Info: Object,
};
var AuthScheema = mongoose.Schema(AuthScheemaDef);
module.exports.AuthScheema = mongoose.model("AuthDetails", AuthScheema);
