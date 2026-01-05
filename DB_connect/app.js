const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const express = require('express');
const app = express();
const path = require('path');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'practise',
  password: '7777',
});


let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// // inserting data into table
// let q = 'insert into user (id, username, email, password) values ?';
// let data = [];
// // insertig in bulk
// // for(let i=1; i<=20; i++){
// //   data.push(getRandomUser());
// // }
//try{
//     connection.query( q , [data] , function (err, results) {
//         if(err) throw err; // It immediately stops execution if an error occurs and reports the error clearly.
//         console.log(results);
//     });
// }catch(err){
//     console.error('Error executing query:', err);
// };


// connection.end();

// app.get('/', (req, res) => {
//   res.send('Hello World');
// })

// this was our Home Route
app.get('/', (req, res) => {
  let q = 'select count(*) from user';
  try {
    connection.query(q, (err, results) => {
      if (err) throw err; // It immediately stops execution if an error occurs and reports the error clearly.
      let count = results[0]['count(*)'];
      res.render(`home.ejs`, { count });
    });
  } catch (err) {
    console.error('Error executing query:', err);
  };
});

// this is our User Route (Show all data from user table)
app.get('/user', (req, res) => {
  let q = 'select * from user';
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let data = results;
      console.log(data);
      res.render("show.ejs", { data });
    });
  } catch (err) {
    console.error('Error executing query:', err);
  };
});

// Edit route
app.get('/user/:id/edit', (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id = "${id}"`; // to add id as string we have to use ""
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let user = results[0]; // since we are getting only one user we take the first element of array means our whole data of that user
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.error('Error executing query:', err);
  };
});

// Update route
app.patch('/user/:id', (req, res) => {
  let { id } = req.params;
  let { password: formpass, username: newusername } = req.body;
  let q = `select * from user where id = "${id}"`;
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let userpass = results[0].password;
      if (formpass != userpass) {
        return res.send("Wrong Password! Cannot update username.");
      }
      else {
        let q2 = `update user set username = "${newusername}" where id = "${id}"`;
        connection.query(q2, (err, results) => {
          if (err) throw err;
          res.redirect('/user');
        });
      }
    });
  } catch (err) {
    console.error('Error executing query:', err);
  };
});

app.listen(7700, () => {
  console.log('Server is running on port 7700');
});