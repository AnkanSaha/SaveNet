function SaveDataToMongoDBatlas(title, data, Ip){
  var mongoose = require('mongoose');
  var MongoModel = require('./MongoDBmodel')
  var url = 'mongodb+srv://AuToBot:AuToBot1567@datastore.bu17xwi.mongodb.net/StoreStory?retryWrites=true&w=majority'
  mongoose.connect(url).then(()=>{
    console.log('Successfully Connected')
    console.log(title, data)
    // Inserting data to Document 
    var Final_Data = new MongoModel({
      Title:title,
      MainStory:data,
      UserIPaddress:Ip,
      Added_Date: new Date()
    })
    // Saving data To MongoDB Atlas 
    Final_Data.save().then(()=>{
      mongoose.connection.close(()=>{
        console.log('connection closed')
      })
    })

  }).catch((error)=>{
    console.log('Unable To Connect Database')
    throw error
  })
}

function DeleteDataToMongoDBatlas(TitlefotData){
  var url = 'mongodb+srv://AuToBot:AuToBot1567@datastore.bu17xwi.mongodb.net/StoreStory?retryWrites=true&w=majority'
  var mongoose = require('mongoose');
  var MongoModel = require('../Server/MongoDBmodel')
   mongoose.connect(url).then(()=>{
    console.log('Connection Successfully established');
    MongoModel.deleteOne({Title:TitlefotData}).then(()=>{
      console.log('Successfully Delete Data')
    }).catch((error)=>{
      console.log('unable to delete data from database'+error)
      throw error
    })
  }).catch((ConnectionError)=>{
    console.error('Unable To Connect The database');
    throw ConnectionError
  })
}

module.exports.SaveData = SaveDataToMongoDBatlas
module.exports.DeleteData = DeleteDataToMongoDBatlas