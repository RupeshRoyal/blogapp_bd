const express = require("express");
const app =express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;



app.use(express.json());//middleware

app.get("/",(req,res)=>{//default route
    res.send("<h1>This is Default Home Page");
});

const dbConnect = require("./config/database");
dbConnect();//connect the database

//routes

const blogRoutes =require("./routes/blogRoutes");
//mount
app.use("/api/blog/v1",blogRoutes);

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT} sucessfully`);
});