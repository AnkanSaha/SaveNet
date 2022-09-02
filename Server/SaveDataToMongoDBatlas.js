function SaveDataToMongoDBatlas(title, data, Ip){
  var mongoose = require('mongoose');
  var MongoModel = require('../Server/MongoDBmodel')
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

module.exports = SaveDataToMongoDBatlas