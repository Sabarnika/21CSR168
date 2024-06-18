const express= require("express")
const app=express()
require("dotenv").config(); 
const modelRoute=require("./route")
const mongoose=require("mongoose")
app.use(express.json());
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("Error connecting to MongoDB:", err));
app.use("/",modelRoute)
app.listen(5000,()=>
{
    console.log("Server started at Port 5000")
})

