const express = require('express');
const app = express.Router();
const Database = require(`../Connector/queries.js`)
const os = require('os');
const Contact_us_model = require('../Database/General/ContactUs_model');
const MongoURL = require('../Database/private/MongoDB_Config');
const mongoose = require('mongoose');

// sending data titles to the client
app.post('/gettitles', (req, res)=>{
    var AccountID = req.body.AccountID;
    console.log(AccountID);
    Database.Query(AccountID, res);
})

// saving the data title to the database
app.post('/savedata', (req, res)=>{
    var Name = req.body.Name;
    var AccountID = req.body.AccountID;
    var Email = req.body.Email;
    var Title = req.body.Title;
    var Data = req.body.Data;
    var Date = req.body.Date;
    Database.SaveData(Name, AccountID, Email, Title, Data, Date, res);
})

// sending specific data to the client
app.post('/getdatainfo', (req, res)=>{
    var DataID = req.body.DataID;
    Database.GetData(DataID, res);
});

// deleting the data title from the database
app.post('/deletedata', (req, res)=>{
    var DataID = req.body.DataID;
    Database.DeleteData(DataID, res);
})

// update specific data title in the database
app.put('/updatedata', (req, res)=>{
    var Name = req.body.Name;
    var DataID = req.body.DataID;
    var AccountID = req.body.AccountID;
    var Email = req.body.Email;
    var Title = req.body.Title;
    var Data = req.body.Description;
    var Date = req.body.Date;
    Database.UpdateData(DataID, Name, AccountID, Email, Title, Data, Date, res);
})

// sending system health to the client
app.get('/api/server/getsystemhelth', async (req, res)=>{
    var FreeRam = os.freemem();
    // getting the free ram
    var Main_Free_ram = Number((FreeRam / 1024 / 1024 / 1024).toFixed(2));
    // getting the total ram
    var results = {
        FreeRam: "",
        TotalRam: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        Platform: os.platform(),
            HostName: os.hostname(),
            Uptime: `${(os.uptime() / 60 / 60).toFixed(2)} Hours`,
            CPU: os.cpus()[0].model,
            CPUCount: os.cpus().length,
            CPUUsage: `${(os.loadavg()[0] * 100).toFixed(2)} %`,
            CPUUsage1: `${(os.loadavg()[1] * 100).toFixed(2)} %`,
            Status: ''
        }
        
        // checking the free ram
        if(Main_Free_ram < 1){
            Main_Free_ram = `${Main_Free_ram} GB`;
            results.FreeRam = Main_Free_ram;
            results.Status = 'Server is busy';
        }
        else if(Main_Free_ram >= 1 && Main_Free_ram <= 2){
            Main_Free_ram = `${Main_Free_ram} GB`;
            results.FreeRam = Main_Free_ram;
            results.Status = 'Slighly Low Ram in server';
        }
        else if(Main_Free_ram > 2){
            Main_Free_ram = `${Main_Free_ram} GB`;
            results.FreeRam = Main_Free_ram;
            results.Status = 'Server is running smoothly';
        }
            res.status(200).json(results);
})

// contact us API route
app.post('/api/contactus', async (req, res)=>{
    const {Name, Email, Message} = req.body;
    await mongoose.connect(MongoURL)
    var NewSet = new Contact_us_model({
        Name: Name,
        Email: Email,
        Message: Message
    })
    await NewSet.save();
    res.status(200).json({message: 'Message Sent Successfully'});
})
// sending the 404 page
app.get('*', (req, res)=>{
    res.status(404).render('404', {title: '404 : Page Not Found', exit:'Go To Home', routes:'/'});
})

// exporting the module
module.exports = app