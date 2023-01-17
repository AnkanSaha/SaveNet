const mongoose = require('mongoose');

let contactSchema = new mongoose.Schema({
    Name: {type: String, required: true, default: "Anonymous"},
    Email: {type: String, required: true, default: "Anonymous"},
    Message: {type: String, required: true, default: "No Message"},
    Date : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Contactus', contactSchema);