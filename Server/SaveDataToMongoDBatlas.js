function SaveDataToMongoDBatlas(title, data, Ip){
  var mongoose = require('mongoose');
  var url = 'mongodb+srv://AuToBot:AuToBot1567@datastore.bu17xwi.mongodb.net/StoreStory?retryWrites=true&w=majority'
  mongoose.connect(url).then(()=>{
    console.log('Successfully Connected')
    console.log(title, data)
    var story_sceema = {
      Title : {
        type: String,
        required:true
      },
      MainStory: {
        type: String,
        required:false
      },
      UserIPaddress:{
        type:String,
        required:true
      }
    } 
    const Story_sceema = mongoose.Schema(story_sceema)
    // making models and collections 
    const Story_Model = new mongoose.model('Storie', Story_sceema)
    // Inserting data to Document 
    var Final_Data = new Story_Model({
      Title:title,
      MainStory:data,
      UserIPaddress:Ip
    })
    // Saving data To MongoDB Atlas 
    Final_Data.save()

  }).catch((error)=>{
    console.log('Unable To Connect Database')
    throw error
  })
}
module.exports = SaveDataToMongoDBatlas