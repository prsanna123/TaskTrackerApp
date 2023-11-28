const connectToMongo = require('./main.js')
const express=require('express')
connectToMongo;
const app=express()
var cors = require('cors')
app.use(cors({
    origin:"https://task-tracker-app-6go3.vercel.app",
    methods:["POST","GET"],
    credentials:true
  }))
const port=5000
app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/tasks',require('./routes/tasks'))
app.get('/',(req,res) => {
    res.send('Hello prasanna')
})
app.listen(port,() => {
    console.log("task app listening at port 5000")
})
