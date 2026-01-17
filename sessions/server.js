const express = require('express');
const app = express();
const PORT = process.env.PORT || 7700;
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

// app.use(cookieParser("secretodeforcookiesignature"));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash()); // now you can use flash 


app.use((req , res , next)=>{
    res.locals.successmsg = req.flash("success"); // jitne flash create karne h yaha kardo. or fir unko kitne bhi ejs files mai use karlo with same variable name. 
    res.locals.errormsg = req.flash("error");
    next();
});

// just a random route for information that how to show how many request are gone to same session. 
// app.get("/reqcount" , (req , res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You sent a request ${req.session.count} times.`);
// });

app.get('/register' , (req,res) =>{
    let {name = "ananyomous" } = req.query;
    req.session.name = name;
    if(name === "ananyomous"){
        req.flash("error" , "Please register");
    }else{
        req.flash("success" , "User Registered successfully");
    }
    res.redirect("/hello");
});

app.get('/hello' , (req,res) =>{
    // res.locals.successmsg = req.flash("success"); // shift these in middleware. 
    // res.locals.errormsg = req.flash("error");
    res.render("page.ejs" , {name : req.session.name});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});