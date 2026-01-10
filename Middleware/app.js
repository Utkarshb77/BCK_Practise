const express = require('express');
const app = express();
const port = 4000;
const MyErrors = require('./MyErrors');

// Custom middleware function   
app.use('/api' , (req, res, next) => {
    let {token} = req.query;
    if(token === '7777'){
        next();
    }
    throw new MyErrors(477, 'Invalid token provided'); // this is how errors are thrown in express. And we can make our own custom errors like this in MyErrors.js . 
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api', (req, res) => {
    res.send("You are a valid user.");
});

app.get('/api/data', (req, res) => {
    res.send("Data shown here.");
});

app.get('/admin' , (req, res) => {
    if(req.query.admin === 'true'){
        return res.send("Welcome Admin");
    }
    throw new MyErrors(403,'Access to Admin is forbidden');
});

app.use((err, req, res, next) => {
    console.log("---ERROR---");
    res.send(err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});