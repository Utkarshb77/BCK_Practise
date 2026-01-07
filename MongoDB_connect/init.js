const mongoose = require("mongoose");
const Chat = require("./models/chat.js"); // Importing the chat model
main().then(() =>{
    console.log("Connected to MongoDB successfully");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/practiceDB"); // Connecting to MongoDB on port 27017 and making database named practiceDB
}

let allchats = [
    {
        from: "Radha",
        to: "Krishna",
        message: "You are my everything!",
        created_at: new Date(), 
    },
    {
        from: "Utkarsh",
        to: "Radha",
        message: "I also love you",
        created_at: new Date(),
    },
    {
        from: "Krishna",
        to: "Utkarsh",
        message: "Let's be friends",
        created_at: new Date(),
    }
];


Chat.insertMany(allchats);
// run init.js once to insert multiple chat messages into the database