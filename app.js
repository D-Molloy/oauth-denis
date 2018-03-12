const express = require('express');
const authRoutes = require("./routes/auth-routes");
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys')

const PORT = 3000;
const app = express();

//setup view engine
app.set("view engine", 'ejs');

//connect to MongoDB
mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("connected to mongodb")
})

//setup routes
app.use("/auth", authRoutes)

//create home route
app.get('/',  (req, res)=>{
    res.render("home")
})

app.listen(PORT, ()=> {
    console.log("App now listening on PORT:"+PORT)
})