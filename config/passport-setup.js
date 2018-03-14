const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");


//2nd
//serialize user is called after the cb function from the redirect URI
passport.serializeUser((user, done)=>{
    //this is the mongo _id not googleId
    //null is the error
    done(null, user.id);
});

//3rd
//retrieving the user from the id
passport.deserializeUser((id, done)=>{
    // search the DB for the id and return the user
    User.findById(id).then((user)=>{
        //passing the user to the next stage (attaching the user property to the req obj sent to the home route in app js)
        done(null, user);
    })

});

// 1st
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
        // console.log(profile);
      //creating a user is asynchronous, so we want to wait until its finished

      //check if user exists in DB
      //if the user is found they're the current user
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //already a user
          // console.log("user is: ", currentUser);
            done(null, currentUser);  //goes to serializeUser
        } else {
          //if not create new user
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.image.url
          })
            .save()
            .then(newUser => {
              // console.log("new user created: ", newUser);
              done(null, newUser); //goes to serializeUser
            });
        }
      });
    }
  )
);
