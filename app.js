const express = require('express');
const authRoutes = require("./routes/auth-routes");
const passportSetup = require('./config/passport-setup');

const PORT = 3000;
const app = express();

//setup view engine
app.set("view engine", 'ejs');

//setup routes
app.use("/auth", authRoutes)

//create home route
app.get('/',  (req, res)=>{
    res.render("home")
})

app.listen(PORT, ()=> {
    console.log("App now listening on PORT:"+PORT)
})