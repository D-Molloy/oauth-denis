const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      //options for google strategy
      // need a client ID and client secret
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //passport CB function from the redirect URI
      //this is where we exchange the code we get from google after consent and get the actual profile info
      //this is where we use mLab to check to see if the user exists in our db ...if they do, pull the exisitng info
      //if not create new profile in the db
      //   console.log(profile);
      //creating a user is asynchronous, so we want to wait until its finished

      //check if user exists in DB
      //if the user is found they're the current user
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //already a user
          console.log("user is: ", currentUser)
        } else {
          //if not create new user
          new User({
            userName: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created: ", newUser);
            });
        }
      });
    }
  )
);
