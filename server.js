const bodyParser = require('body-parser');
const express = require('express');
const twilio = require('./src/twilio.js');
const postgres = require('./src/postgres.js');

const port = 3000 || process.env.PORT;

const app = express();

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set up bodyParser
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({extended: true})); 

// receive and respond to twilio messages
app.post('/message', async (req, res) => {
  twilio.receive_message(req.body);
  res.send("Ok");
});

// get all posts
app.get('/posts', async (req, res) => {
  const posts = await postgres.getAllPosts(); 
  res.send(posts.resp.reverse().map(x => {
    const dateobj = new Date(x.created_at);
    const date = `${dateobj.getMonth()+1}/${dateobj.getDate()}/${dateobj.getFullYear()}`
    return {
      image_url: x.imageURL,
      description: x.description,
      date,
    }
  }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
