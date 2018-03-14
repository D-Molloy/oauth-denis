//creating an instance of a router
const router = require("express").Router();
const passport = require("passport");
//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send("logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    //what information do we want from user's profile (goes into an array)
    scope: ["profile"]
  })
);

//callback route for google to redirect to
//passport now has details about the user (code string) from the consent string, and the callback function from passport-setup is fired, once that is complete, the req, res cb function is fired
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    //the user is now logged in
    //we can access the user on the request object thanks to passport
    //we get the code to get the user info from google after we select the account we want to use
    console.log(req.user)

    //we are going to redirect the user to a profile page
    //we need to create the profile route in a different route file - profile-routes (because it doesn't have to do with auth)
    res.redirect('/profile/')
})

//exporting out router with all the routes we've defined
module.exports = router;
