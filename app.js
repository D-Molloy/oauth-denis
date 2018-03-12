const express = require('express');
const PORT = 3000;
const app = express();

//setup view engine
app.set("view engine", 'ejs');

//create home route
app.get('/',  (req, res)=>{
    res.render("home")
})

app.listen(PORT, ()=> {
    console.log("App now listening on PORT:"+PORT)
})