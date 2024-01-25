const mongoose = require('mongoose')
const AuthScheemaDef = {
  Account_ID: { type: String, required: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Country: { type: String, required: true },
  IsPaid: { type: Boolean, default: false, required: true },
  Password: { type: String, required: true },
  Account_Create_Date: { type: String, required: true },
  Account_Create_Time_Device_Info: { type: Object, required: false }
}
const AuthScheema = mongoose.Schema(AuthScheemaDef)
module.exports.AuthScheema = mongoose.model('AuthDetails', AuthScheema)
