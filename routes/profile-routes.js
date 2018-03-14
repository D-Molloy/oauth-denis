//this router instance controls all of the profile routes - app.js - app.use('/profile',profileRouts )
const router = require("express").Router();

//create middleware to check if the usr is authorized/logged in - done between the route and the callback funtion in the get route
const authCheck = (req, res, next) => {
  //if the user isn't logged in
  if (!req.user) {
      res.redirect('/auth/login')
  } else{
      next()
  }
};

router.get("/", authCheck, (req, res) => {
  //use templating to display pages
  res.send("you are logged in - " + req.user.userName);
});

module.exports = router;
