const express = require('express');
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// takes our cookie and sets an age to it, encrypt it (the cookie/id) and send it to the browser.  Then its sent back and decrypted
const cookieSession = require('cookie-session');
const passport = require('passport');


const PORT = 3000;
const app = express();

//setup view engine
app.set("view engine", 'ejs');


//encrypts cookie from serializeUser
app.use(cookieSession({
    //time must be in milliseconds (1 day below) - 24 hrs day - 60 min hr - 60 sec min - 1000 milli sec
    maxAge: 24 * 60 * 60 * 1000,
    // cookieSession pics one of these strings (in array) and uses them as a key
    keys:[keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
// use session cookies
app.use(passport.session());

//connect to MongoDB
mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("connected to mongodb")
})

//setup routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

//create home route
app.get('/',  (req, res)=>{
    res.render("home")
})

app.listen(PORT, ()=> {
    console.log("App now listening on PORT:"+PORT)
})