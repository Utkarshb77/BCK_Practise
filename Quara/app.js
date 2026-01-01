const express = require('express');
const app = express();
const port = 7777;

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

let posts = [
        {
            id: uuidv4(),
            author: "Radha",
            content: "I love Krishna"
        },
        {
            id: uuidv4(),
            author: "Krishna",
            content: "I love Radha" 
        },
        {
            id: uuidv4(),
            author: "Shirsh",
            content: "Jai Jai Shree Radhe"
        }
    ];
app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/posts', (req, res) => {
    // Logic to create a new post would go here
    const post = {
        author: req.body.author,
        content: req.body.content
    };
    let id = uuidv4();
    post.id = id;
    posts.push(post);
    res.redirect("/posts");
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send('Post not found');
    res.render('show.ejs', { post });
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit.ejs', { post });
});


app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find(p => p.id === id); 
    if (post) {
        post.content = newcontent;
        res.redirect(`/posts`);
    } else {
        res.status(404).send('Post not found');
    }  
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
