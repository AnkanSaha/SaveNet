const mongoose = require('mongoose')
const GeneralData = require('../core/keys/keys')
const DataQuery = require('../Models/Dashboard/dashboardModel')

// Sending all the data title to the client
async function Query (AccountID, res) {
  try {
    await mongoose.connect(GeneralData.MONGO_URI)
    const Data = await DataQuery.Query.find({ Account_ID: AccountID })
    const Title = []
    const DataID = []
    Data.forEach((data) => {
      Title.push(data.Title)
      DataID.push(data._id)
    })
    res.status(200).send({ Status: 'Success', titles: Title, DataID })
  } catch (error) {
    console.log(error)
    res.status(500).json({ Status: 'Internal Server Error' })
  }
}
// Save the data title to the database
async function SaveData (Name, AccountID, Email, Title, Data, Date, res) {
  try {
    await mongoose.connect(GeneralData.MONGO_URI)
    const Find = await DataQuery.Query.find({
      Account_ID: AccountID,
      Title
    })
    if (Find.length == 0) {
      const FinalData = new DataQuery.Query({
        Name,
        Email,
        Account_ID: AccountID,
        Title,
        Description: Data,
        Date
      })
      const stastus = await FinalData.save()
      console.log(stastus)
      res.status(200).json({ Status: 'Success fully saved to the database' })
    } else if (Find.length != 0) {
      res.status(200).json({ Status: 'Title already exist' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ Status: 'Internal Server Error' })
  }
}

// update specific data title in the database
async function UpdateData (
  DataID,
  Name,
  AccountID,
  Email,
  Title,
  Data,
  Date,
  res
) {
  try {
    await mongoose.connect(GeneralData.MONGO_URI)
    const Finder = await DataQuery.Query.find({ _id: DataID })
    if (Finder.length == 0) {
      res.status(200).json({ Status: 'Title not found' })
    } else if (Finder.length != 0) {
      const Complete = await DataQuery.Query.findByIdAndUpdate(DataID, {
        Name,
        Email,
        Account_ID: AccountID,
        Title,
        Description: Data,
        Date
      })
      if (Complete.length != 0) {
        res.status(200).json({ Status: 'Success fully updated' })
      } else {
        res.status(200).json({ Status: 'Failed to update' })
      }
    }
  } catch (error) {
    res.status(500).json({ Status: 'Internal Server Error' })
  }
}

async function GetData (DataID, res) {
  try {
    await mongoose.connect(GeneralData.MONGO_URI)
    const Data = await DataQuery.Query.find({ _id: DataID })
    if (Data.length == 0) {
      res.status(200).json({ Status: 'Title not found' })
    } else {
      res.status(200).json({ Status: 'Success', Data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ Status: 'Internal Server Error' })
  }
}

async function DeleteData (ID, res) {
  try {
    await mongoose.connect(GeneralData.MONGO_URI)
    const Data = await DataQuery.Query.find({ _id: ID })
    if (Data.length == 0) {
      res.status(200).json({ Status: 'Title not found' })
    } else {
      await DataQuery.Query.deleteOne({ _id: ID })
      res.status(200).json({ Status: 'Success' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ Status: 'Internal Server Error' })
  }
}

// exporting the module
module.exports = {
  Query,
  SaveData,
  GetData,
  DeleteData,
  UpdateData
}
