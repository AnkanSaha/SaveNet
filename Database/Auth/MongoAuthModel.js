const mongoose = require('mongoose');
let AuthScheemaDef = {
    Name:String,
    Email:String,
    Country:String,
    Password:String
}
var AuthScheema = mongoose.Schema(AuthScheemaDef);
module.exports.AuthScheema = mongoose.model('AuthDetails', AuthScheema)