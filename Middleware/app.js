const express = require('express');
const app = express();
const port = 4000;
// Custom middleware function   
app.use('/api' , (req, res, next) => {
    let {token} = req.query;
    if(token === '7777'){
        next();
    }
    throw new Error('Invalid token provided'); // this is how errors are thrown in express. And we can make our own custom errors like this also. 
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});