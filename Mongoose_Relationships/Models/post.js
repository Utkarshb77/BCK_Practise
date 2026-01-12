const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => console.log("Mongoose connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Posts');
};

const postSchema = new mongoose.Schema({
    content : String,
    likes : Number,
    user : {
        type: mongoose.Schema.Types.ObjectId, // Storing reference to another document
        ref: 'User'  // Reference to the User model
    }
});

const userSchema = new mongoose.Schema({
    username: String,
    email : String,
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// const addData = async () => {
//     // let user1 = new User({
//     //     username: 'alice',
//     //     email: 'alice@example.com'
//     // });
//     // let post1 = new Post({
//     //     content: 'Hello everyone!',
//     //     likes: 5,
//     //     user: user1._id
//     // });
//     // let post2 = new Post({
//     //     content: 'Bye Bye :)',
//     //     likes: 5,
//     //     user: user1._id
//     // });

//     // post1.user = user1;
//     // post2.user = user1;

//     let user = await User.findOne({ username: 'alice'});
//     let post4 = new Post({
//         content: 'Adding a new post',
//         likes: 10,
//     });
//     post4.user = user;
//     await post4.save();

//     // await user1.save();
//     // await post1.save();
// };

// addData();

const findPosts = async () => {
    let posts = await Post.find().populate('user'); // Populating the user field with actual user documents
    console.log(posts);
}
findPosts();