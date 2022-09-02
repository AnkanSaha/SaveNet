const mongoose = require('mongoose');
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
    },
    Added_Date:{
        type:String
    }
  } 
  const Story_sceema = mongoose.Schema(story_sceema)
  // making models and collections 
  module.exports =  mongoose.model('Storie', Story_sceema)