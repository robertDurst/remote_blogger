const bodyParser = require('body-parser');
const express = require('express');
const twilio = require('./twilio.js');

const port = 3000 || process.env.PORT;

const app = express();
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({extended: true})); 

app.post('/message', async(req, res) => {
  const body = req.body;
  console.log(body);
  if (body.NumMedia > 0) {
    // image
    for (var i = 0; i < body.NumMedia; i++) {
        const mediaUrl = body[`MediaUrl${i}`];
        const contentType = body[`MediaContentType${i}`];
        console.log(mediaUrl);
        console.log(contentType);
    }
    console.log("Received an image");
    twilio.send_text(body.From, "Received image.");
  } else {
    // text
    console.log("Only a message");
    twilio.send_text(body.From, "Message received.");
  }

  res.send("Ok");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
