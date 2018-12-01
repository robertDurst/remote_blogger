const accountSid = process.env.TWILIO_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const pg = require('./postgres');

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

const receive_message = body => {
  if (body.NumMedia > 0) {
    const image_url = body.MediaUrl0;
    const description = body.Body ? body.Body : "";
    handle_media(body, image_url, description);
  } else {
    handle_message(body, body.Body);
  }
}

const handle_media = async (body, image_url, description) => {
  const { resp } = await pg.addPost(image_url, description);
  id = resp.id;
  send_text(body.From, `Received post with description "${description}". To update description, respond with prefix: ${id}~`);
}

const handle_message = async (body, msg) => {
  const isDescription = msg.indexOf('~') != -1;
  // first handle message to update a post description
  if (isDescription) {
    const splitMsg = msg.split('~');
    const id = splitMsg[0];
    const description = splitMsg[1].trim();

    const { err } = await pg.updatePostWithDescription(id, description);

    if (err === null) {
      send_text(body.From, "Description updated!");
    } else {
      send_text(body.From, `Error updating description for post with id: ${id}.`);
    }
  } else {
    // handle message keyword actions
    switch(msg.toLowerCase()) {
      case "num_posts":
        const { resp, err } = await pg.getAllPosts();
        if (err === null) {
          send_text(body.From, `There are ${resp.length} posts on your blog.`);
        } else {
          send_text(body.From, `Error: unable to retreive number of posts from database.`);
        }
        break;
      default:
        send_text(body.From, `Unknown command. Send "help" to get list of recognized commands.`);
    }
  }
}

module.exports = {
  receive_message,
}
