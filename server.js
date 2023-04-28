require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



console.log(process.env.DATABASE)
const db = knex({
  client: process.env.CLIENT,
  connection: {
    connectionString: process.env.CONNECTION_STRING,
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
         rejectUnauthorized: false,
     },
  }
});

  // db.select('*').from ('users').then(data=>{
  //   // console.log(data);
  // });


const app = express();

app.use(bodyParser.json())
app.use(cors());


app.get('/', (req, res)=> { res.send(db.user) })

app.post('/signin', (req, res) =>{signin.handleSignin (req, res, db, bcrypt)});

app.post('/register',(req, res) =>{register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) =>{profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(5000, ()=>{
    console.log("app is running on port 5000");
})

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });