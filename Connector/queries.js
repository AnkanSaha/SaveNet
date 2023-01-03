const mongoose = require("mongoose");
const MongoDBauthUrl = require('../Database/MongoDB_Config.js')
const Backup = require("../backup/BackupConfig");
const DataQuery = require("../Database/Dashboard/dashboardModel.js");

//Sending all the data title to the client
async function Query(AccountID, Email, res){
    try {
        await mongoose.connect(MongoDBauthUrl);
        var Data = await DataQuery.Query.find({Account_ID: AccountID, Email: Email});
        let Title = [];
        Data.forEach((data)=>{
            Title.push(data.Title);
        })
        res.status(200).send({Status: "Success", titles: Title});
    } catch (error) {
        console.log(error);
        res.status(500).json({Status:"Internal Server Error"});
    }
}
// Save the data title to the database
async function SaveData(Name, AccountID, Email, Title, Data, Password, Date, res){
    try {
        await mongoose.connect(MongoDBauthUrl);
        var Find = await DataQuery.Query.find({Title})
        if(Find.length == 0){
            var FinalData = new DataQuery.Query({
                Name: Name,
                Email: Email,
                Account_ID: AccountID,
                Password: Password,
                Title: Title,
                Description: Data,
                Date: Date
            })
            var stastus = await FinalData.save();
            console.log(stastus);
            res.status(200).json({Status: "Success fully saved to the database"});
        }
        else{
            res.status(200).json({Status: "Title already exist"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({Status:"Internal Server Error"});
    }
}

async function GetData(Title, Email, res){
    try {
        await mongoose.connect(MongoDBauthUrl);
        var Data = await DataQuery.Query.find({Title, Email});
        if(Data.length == 0){
            res.status(200).json({Status: "Title not found"});
        }
        else{
            res.status(200).json({Status: "Success", Data: Data});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({Status:"Internal Server Error"});
    }
}

async function DeleteData(Title, Account_ID, res){
    try {
        await mongoose.connect(MongoDBauthUrl);
        var Data = await DataQuery.Query({Title, Account_ID})
        if(Data.length == 0){
            res.status(200).json({Status: "Title not found"});
        }
        else{
            var status = await DataQuery.Query.deleteOne
            ({Title, Account_ID});
            console.log(status);
            res.status(200).json({Status: "Success"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({Status:"Internal Server Error"});
    }
}

// exporting the module
module.exports ={
    Query: Query,
    SaveData: SaveData,
    GetData: GetData,
    DeleteData: DeleteData
}