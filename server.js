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


// console.log(process.env.CLIENT)
// const db = knex({
//     client: process.env.CLIENT,
//     connection: {
//       connectionString:"postgres://mydb_30hi_user:nktiJZsN8mkNZ9AGER6wL0NUbnXXyj9x@dpg-cgqq7o3k9u5es1439bs0-a.oregon-postgres.render.com/mydb_30hi",
//       host : 'dpg-cgqq7o3k9u5es1439bs0-a.oregon-postgres.render.com',
//       port : 5432,
//       user : 'mydb_30hi_user',
//       password : 'nktiJZsN8mkNZ9AGER6wL0NUbnXXyj9x',
//       database : 'mydb_30hi',
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     }
//   });

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

