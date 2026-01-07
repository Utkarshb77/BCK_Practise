const express = require("express");
const app = express();
const port = 7700;
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js"); // Importing the chat model

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(methodOverride('_method')); // To use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

const mongoose = require("mongoose"); // Importing mongoose

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/practiceDB"); // Connecting to MongoDB on port 27017 and making database named practiceDB
}


main().then(() =>{
    console.log("Connected to MongoDB successfully");
})
.catch(err => console.log(err));

// Creating and saving a chat message to the database (as an example)
// let chat1 = new Chat({
//     from: "Krishna",
//     to: "Radha",
//     message: "I love you more than anything!",
//     created_at: new Date(),
// });
// chat1.save().then(() =>{
//     console.log("Chat message saved successfully");
// }).catch(err => console.log(err));

app.get('/' , (req , res) =>{
    res.send("Hello from Express server");
});

app.get('/chats' , async (req , res) =>{
    try {
        const chats = await Chat.find({}); // Fetching all chat messages from the database
        console.log(chats);
        res.render("chats" , { chats }); // Rendering the chats.ejs view and passing the chat messages
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving chat messages");
    }
});

// Route to render form for new chat message
app.get('/chats/new' , (req , res) =>{
    res.render("new.ejs"); 
});

// create Route
app.post('/chats' , async (req , res) =>{
    try {
        const { from , to , message } = req.body;
        const newChat = new Chat({
            from : from,
            to : to, 
            message : message,
            created_at: new Date(),
        });
        await newChat.save();   
        res.redirect('/chats'); // Redirecting to the chats page after saving
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving chat message");
    }
});

// Edit Route
app.get('/chats/:id/edit' , async (req , res) =>{
        const { id } = req.params;  
        const chat = await Chat.findById(id);
        res.render("edit.ejs" , { chat });
});

// Update Route
app.put('/chats/:id' , async (req , res) =>{
    try {               
        const { id } = req.params;
        const { message : newmessage } = req.body;

        await Chat.findByIdAndUpdate(id, { message: newmessage } , {  runValidators: true, new: true });
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating chat message");
    }
});


//  Delete Route
app.delete('/chats/:id' , async (req , res) =>{
    try {
        const { id } = req.params;
        await Chat.findByIdAndDelete(id);
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting chat message");
    }
});

app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
});