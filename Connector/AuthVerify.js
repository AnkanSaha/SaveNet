const AuthModel = require('../Database/Auth/MongoAuthModel');
const mongoose = require('mongoose');

//Registration
function Registration(Name, Email, Country, Password, res){
    mongoose.connect('mongodb+srv://Ankan157:Ankan1567@resultshowdatabse.q1ops.mongodb.net/Authentication?retryWrites=true&w=majority').then(()=>{
        var Registration = new AuthModel.AuthScheema({
            Name:Name,
            Email:Email,
            Country:Country,
            Password:Password
        })
        AuthModel.AuthScheema.find({Email:Email}).then((result)=>{
            console.log(result)
            if(result==''){
                Registration.save().then(()=>{
                    console.log('Credential Saved');
                    res.status(200).json({status:"User Successfully Registered"})
                    mongoose.connection.close()
                }).catch((saveerr)=>{
                    console.log(saveerr)
                    res.status(500).json({status:"Internal Server Error"})
                })
            }
            else if(result !=''){
                console.log('User Already Exist')
                res.status(404).json({status:"User Already Exist with this details, Please Login 😃"})
                mongoose.connection.close()
            }
        }).catch((finderr)=>{
            console.log(finderr)
            res.status(500).json({status:"Internal Server Error"})
        })
    }).catch((conerror)=>{
    console.log(conerror)
    })
}
// login
function login(Email, Password, res){
    mongoose.connect('mongodb+srv://Ankan157:Ankan1567@resultshowdatabse.q1ops.mongodb.net/Authentication?retryWrites=true&w=majority').then(()=>{
        AuthModel.AuthScheema.find({Email:Email, Password:Password}).then((loginresult)=>{
            console.log(loginresult)
            if(loginresult==''){
                res.status(404).json({status:"User Not Registered"});
                mongoose.connection.close()
            }
            else if(loginresult!=''){
                res.status(200).json({status:loginresult})
                mongoose.connection.close()
            }
        }).catch((finderror)=>{
            console.log(finderror)
        })
    }).catch((connectionerror)=>{
        console.log(connectionerror)
    })
}
module.exports.Registration = Registration
module.exports.login = login