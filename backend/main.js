const mongoose =require("mongoose");
// const mongoURI="mongodb://0.0.0.0:27017/mydb"
const mongoURI="mongodb+srv://Lakshmi:MOD9vx7y6NR4TIsV@cluster0.dmhrq.mongodb.net/?retryWrites=true&w=majority"
const connectDB=async()=>{
    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(mongoURI)
        console.log("mongo connected")
    }
    catch(error){
        console.log(error)
        process.exit()
    }
}
connectDB()

