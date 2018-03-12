const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")
passport.use(
  new GoogleStrategy({
    //options for google strategy
    // need a client ID and client secret
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }), ()=>{
      //passport CB function
  }
);
