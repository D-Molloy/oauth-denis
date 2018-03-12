const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")


passport.use(
  new GoogleStrategy({
    //options for google strategy
    // need a client ID and client secret
    callbackURL:"/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done)=>{
      //passport CB function from the redirect URI
      //this is where we exchange the code we get from google after consent and get the actual profile info
      //this is where we use mLab to check to see if the user exists in our db ...if they do, pull the exisitng info
      //if not create new profile in the db
      
      console.log(profile)
  })
);


