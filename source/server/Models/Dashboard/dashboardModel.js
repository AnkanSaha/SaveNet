const mongoose = require('mongoose')
const DataQuery = {
  Name: String,
  Email: String,
  Account_ID: String,
  Title: String,
  Description: String,
  Date: String
}
const QueryScheema = mongoose.Schema(DataQuery)
module.exports.Query = mongoose.model('Data', DataQuery)
