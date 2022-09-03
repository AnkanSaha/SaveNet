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
      console.log('Data Successfully Saved in Server Database')
      mongoose.connection.close().then(()=>{
        console.log('connection closed')
      }).catch((ConnectionCloseError)=>{
        console.log('Unable To Disconect With Server Database')
        console.log(ConnectionCloseError)
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
      mongoose.connection.close().then(()=>{
        console.log('Successfully Disconnected With Server Database')
      }).catch((CloseError)=>{
        console.log('Unable To Disconect With Server Database')
        console.error(CloseError)
      })
    }).catch((error)=>{
      console.log('unable to delete data from database'+error)
      throw error
    })
  }).catch((ConnectionError)=>{
    console.error('Unable To Connect The database');
    throw ConnectionError
  })
}

function SearchDataToMongoDBatlas(TitlefotData){
  var url = 'mongodb+srv://AuToBot:AuToBot1567@datastore.bu17xwi.mongodb.net/StoreStory?retryWrites=true&w=majority'
  var mongoose = require('mongoose');
  var MongoDBmodel = require('../Server/MongoDBmodel');
  mongoose.connect(url).then(()=>{
    console.log('Successfully Connected With Server Database')
    MongoDBmodel.find({Title:TitlefotData}).then((result)=>{
      console.log('Sccessfully Data Fached From Server Database')
      console.log(result)
    }).catch((SearchError)=>{
      console.log('Unable To Search data From Server Database')
      console.log(SearchError)
    })
  }).catch((ConnectionError)=>{
    console.log('Unable To Connect with Server Database');
    console.error(ConnectionError)
  })
}

module.exports.SaveData = SaveDataToMongoDBatlas
module.exports.DeleteData = DeleteDataToMongoDBatlas
module.exports.SearchData = SearchDataToMongoDBatlas