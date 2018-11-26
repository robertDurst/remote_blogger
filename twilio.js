const accountSid = process.env.TWILIO_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const send_text = (phone_number, message) => {
  client.messages
    .create({
       body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone_number
    })
    .then(message => console.log(message.sid))
    .done();
}

module.exports = {
  send_text,
}
