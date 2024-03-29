const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '800896145bbb4e4ebb73463013fbf4ae'
   });

  const handleApiCall = (req, res) => {
    app.models
.predict( 'face-detection', req.body.input)
   .then(data =>{
       res.json(data);
   })
//    .catch(err => res.status(400).json('unable to work with API'))
     .catch(err => console.log(err, "API error"))

  }
   
const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err =>res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};