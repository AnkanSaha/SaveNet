const express = require('express');
const app = express();
const path = require('path');
const filesystem = require('fs');
const bodyparser = require('body-parser');
const port = 8000
const jsonAction = require('./Functions/JsonSave')
// custom module 
const MongoServer = require('./Server/MongoDBatlasService')
// Configuration for Start Server
app.listen(port, ()=>{console.log(`server started at port no ${port}`)})

// File Configurations
app.set('view engine', 'pug'); // pug configuration
app.use('/static', express.static('static')); // Static File Configuration
app.set('views', path.join(__dirname, 'Templates')); // Templates for pug

// middileware for from submission encoding
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true, parameterLimit:10000000, limit:'5096mb'})); 
// Control limits

// EndPoints
app.get('/', (request, response)=>{
    var PageTitle = "Wellcome to DataStore Service"
    var Success = {title:PageTitle}
    response.render('SaveData.pug', Success)
}) //Home Services

app.get('/SearchData', (request, response)=>{
    var PageTitle = "Search Your Data and get your data securely"
    var Success = {title:PageTitle}
    response.render('ReadData.pug', Success)
}); // Search Data Services

app.get('/DeleteData', (request, response)=>{
    var PageTitle = "Delete your data from our server instantly"
    var Success = {title:PageTitle}
    response.render('DeleteData.pug', Success)
}); // Delete Data Services


            // Action Requests
    // Method for Save Data
    app.post('/Save', (request, response)=>{
        var TitleForData = request.body.TitleForData
        var MainData = request.body.MainData
        filesystem.readFile(`./Data/Guest/${TitleForData}.txt`, 'utf-8', (error, data)=>{
            if(data){
                var failedmsg = `(${TitleForData}) Data Already Exist on Server`
                var SubMsg = 'Data Exist on server'
                var title = 'Failed To Save Data'
                var send = {title:title, SubMsg:SubMsg, failedmsg:failedmsg}
                response.render('failed.pug', send)
            }
            else if(error){
                filesystem.writeFileSync(`./Data/Guest/${TitleForData}.txt`, MainData);
                var user_IP = request.ip
                MongoServer.SaveData(TitleForData, MainData, user_IP)
                var SuccessMassage = `(${TitleForData}) Successfully Saved To Server`
                var PageTitle = "Successfully Saved Data"
                var SubSuccessMsg = " Your Data is Saved To our Server with Secure hashing "
                jsonAction.saver(TitleForData, MainData)
                var Success = {SuccessMsg:SuccessMassage, title:PageTitle, SubMsg:SubSuccessMsg}
                response.render('preview.pug', Success);
            }
        })
    })

    //Method for Reading Data
    app.post('/Read', (request, response)=>{
        var TitleForReadData = request.body.DataTitleForRead
        filesystem.readFile(`./Data/Guest/${TitleForReadData}.txt`, 'utf-8', (error, MainData)=>{
            if(error){
                var tempfilename = TitleForReadData
                var PageTitle = "Data Not Exist on server"
                var failedmsg = `(${tempfilename}) Data not Exist on Server`
                var submsg = 'Failed To fatched data from server'
                var failed = {title:PageTitle, failedmsg:failedmsg, SubMsg:submsg}
                response.render('failed.pug', failed)
            }
            else{
                console.log(MainData)
                var tempfilename = path.basename(`./Data/Guest/${TitleForReadData}.txt`, '.txt');
                var PageTitle = "Successfully Fatched Data"
                var Status = tempfilename
                MongoServer.SearchData(TitleForReadData, request, response)
                var Success = {title:PageTitle, MainFatchedData:MainData, FatchStatus:Status}
                response.render('ReadData.pug', Success)
            }
        })
    })
    
    // Method for Delete Data
    app.post('/Delete', (request, response)=>{
        var DeleteRequestName = request.body.DataTitleForDelete
        filesystem.unlink(`./Data/Guest/${DeleteRequestName}.txt`, (error)=>{
            if(error){
                var PageTitle = "Data Not Exist on server"
                var failedmsg = `(${DeleteRequestName}) Data Doesn't Exist on Server`
                var submsg = 'Failed To fatched data from server'
                var failed = {title:PageTitle, failedmsg:failedmsg, SubMsg:submsg}
                response.render('failed.pug', failed)
            }
            else{
                var SuccessMassage = `(${DeleteRequestName}) Successfully Delete from Server`
                var PageTitle = "Successfully Delete Data"
                var SubSuccessMsg = " Your Data is Delete from our Server with Secure request "
                MongoServer.DeleteData(DeleteRequestName)
                var Success = {SuccessMsg:SuccessMassage, title:PageTitle, SubMsg:SubSuccessMsg}
                response.render('preview.pug', Success)
            }
        })
    })
// End of EndPoints