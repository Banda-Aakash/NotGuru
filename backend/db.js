const mongoose = require('mongoose')

const mongoURI="mongodb://127.0.0.1:27017/inotebook-database"  

const connectToMongo = async()=>{
    await mongoose.connect(mongoURI)
    console.log("Connected")
}


module.exports=connectToMongo;