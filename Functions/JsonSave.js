function Saver(title, MainData){
    var fs = require('fs')
    var FilePath = `./Data/JSON Data/data.json`
    fs.readFile(FilePath, 'utf-8', (err, data)=>{
        if(err){
            console.log(err)
        }
        else if(!err){
            console.log(data)
            var string_File_readed = JSON.parse(data)
            console.log(string_File_readed)
            var Ready_data = {
                Title:title,
                Data:MainData,
                Date: new Date()
            }
            string_File_readed[`${title}`] = Ready_data
            console.log(string_File_readed)
            var FinalData = JSON.stringify(string_File_readed)
            fs.writeFile(FilePath, FinalData, 'utf-8', ()=>{
                console.log('New Data Added')
            })
        }
    })
}
module.exports.saver = Saver
