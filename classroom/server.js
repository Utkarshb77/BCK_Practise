const express = require('express');
const app = express();
const PORT = process.env.PORT || 7700;
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./post');
const cookieParser = require('cookie-parser');

app.use(cookieParser("secretodeforcookiesignature"));

app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Set cookies.
app.get('/setcookie' , (req , res) =>{
    res.cookie('testCookie', 'testValue', { httpOnly: true, secure: true });
    res.cookie('greet', 'namaste');
    res.cookie('name', 'Radha');
    res.send('Cookie has been set');
});

// Read cookies.
app.get("/greet", (req , res) =>{
    let {name="anonymous"} = req.cookies;
    res.send(`Hello ${name}`);
});

// Set signed cookies.
app.get('/getsignedcookie' , (req , res) =>{
    res.cookie('made-in' , 'India' , {signed: true});
    res.send('Signed cookie has been set');
});

// Verify signed cookies. 
app.get("/verify", (req , res) =>{
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});