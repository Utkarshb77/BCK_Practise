// In this folder , we'll only learn how relationships work in mongoose 
const mongoose = require('mongoose');

main().then(() => console.log("Mongoose connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationships');
};

const userSchema = new mongoose.Schema({
  username: String,
  addresses : [
    {
        _id : false, // to prevent mongoose from creating an _id for subdocument
        location: String,
        city : String,
        country : String
    }
  ]
});


const User = mongoose.model('User', userSchema);

const addUsers = async () => {
  const user1 = new User({
    username: 'ALia Bhatt',
    addresses: [
      {
        location: 'Street 1',
        city: 'Mumbai',
        country: 'India'
      }]
    });
    user1.addresses.push({ location: "Katrina Kaif", city: "Delhi", country: "India" });
    await user1.save();
    console.log(user1);
};

addUsers();