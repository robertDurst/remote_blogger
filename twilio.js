// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.TWILIO_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const send_text = phone_number => {
  client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone_number
    })
    .then(message => console.log(message.sid))
    .done();
}
