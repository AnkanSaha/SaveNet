const mongoose = require('mongoose');
var story_sceema = {
  Title:String,
  MainStory:String,
  UserIPaddress:String,
  Added_Date:String
  } 
  const Story_sceema = mongoose.Schema(story_sceema)
  // making models and collections 
  module.exports =  mongoose.model('Storie', Story_sceema)