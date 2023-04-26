
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');




const db = knex({
    client: 'pg',
    connection: {
      connectionString:"host=dpg-cgqq7o3k9u5es1439bs0-a.oregon-postgres.render.com port=5432 dbname=mydb_30hi user=mydb_30hi_user password=xxxxxxx sslmode=prefer connect_timeout=10",
      host : 'dpg-cgqq7o3k9u5es1439bs0-a.oregon-postgres.render.com',
      port : 5432,
      user : 'mydb_30hi_user',
      password : '12345',
      database : 'mydb_30hi'
    }
  });

  // db.select('*').from ('users').then(data=>{
  //   // console.log(data);
  // });


const app = express();

app.use(bodyParser.json())
app.use(cors());


app.get('/', (req, res)=> { res.send(database.mydb_30hi_user) })

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

app.listen(3000, ()=>{
    console.log("app is running on port 3000");
})

