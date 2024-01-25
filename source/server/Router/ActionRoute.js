const express = require('express')
const app = express.Router()
const Database = require('../Functions/queries')
const os = require('os')
const Contact_us_model = require('../Models/General/ContactUs_model.js')
const GeneralData = require('../core/keys/keys')
const mongoose = require('mongoose')

// sending data titles to the client
app.post('/gettitles', (req, res) => {
  const AccountID = req.body.AccountID
  console.log(AccountID)
  Database.Query(AccountID, res)
})

// saving the data title to the database
app.post('/savedata', (req, res) => {
  const Name = req.body.Name
  const AccountID = req.body.AccountID
  const Email = req.body.Email
  const Title = req.body.Title
  const Data = req.body.Data
  const Date = req.body.Date
  Database.SaveData(Name, AccountID, Email, Title, Data, Date, res)
})

// sending specific data to the client
app.post('/getdatainfo', (req, res) => {
  const DataID = req.body.DataID
  Database.GetData(DataID, res)
})

// deleting the data title from the database
app.post('/deletedata', (req, res) => {
  const DataID = req.body.DataID
  Database.DeleteData(DataID, res)
})

// update specific data title in the database
app.put('/updatedata', (req, res) => {
  const Name = req.body.Name
  const DataID = req.body.DataID
  const AccountID = req.body.AccountID
  const Email = req.body.Email
  const Title = req.body.Title
  const Data = req.body.Description
  const Date = req.body.Date
  Database.UpdateData(DataID, Name, AccountID, Email, Title, Data, Date, res)
})

// sending system health to the client
app.get('/api/server/getsystemhelth', async (req, res) => {
  const FreeRam = os.freemem()
  // getting the free ram
  let Main_Free_ram = Number((FreeRam / 1024 / 1024 / 1024).toFixed(2))
  // getting the total ram
  const results = {
    FreeRam: '',
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
  if (Main_Free_ram < 1) {
    Main_Free_ram = `${Main_Free_ram} GB`
    results.FreeRam = Main_Free_ram
    results.Status = 'Server is busy'
  } else if (Main_Free_ram >= 1 && Main_Free_ram <= 2) {
    Main_Free_ram = `${Main_Free_ram} GB`
    results.FreeRam = Main_Free_ram
    results.Status = 'Slighly Low Ram in server'
  } else if (Main_Free_ram > 2) {
    Main_Free_ram = `${Main_Free_ram} GB`
    results.FreeRam = Main_Free_ram
    results.Status = 'Server is running smoothly'
  }
  res.status(200).json(results)
})

// contact us API route
app.post('/api/contactus', async (req, res) => {
  const { Name, Email, Message } = req.body
  await mongoose.connect(GeneralData.MONGO_URI)
  const NewSet = new Contact_us_model({
    Name,
    Email,
    Message
  })
  await NewSet.save()
  res.status(200).json({ message: 'Message Sent Successfully' })
})
// sending the 404 page
app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: '404 : Page Not Found',
    exit: 'Go To Home',
    routes: '/'
  })
})

// exporting the module
module.exports = app
