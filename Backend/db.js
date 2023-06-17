const mongoose= require('mongoose');
const mongoUri='mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

const connectToMongo=()=>{
    mongoose.connect(mongoUri).then(()=>{
        console.log("Successfully connect to mongodb");
    }).catch(()=>{
        console.log("Sorry,don't connect to mongodb");
    })
}

module.exports=connectToMongo