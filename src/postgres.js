const {
    Sequelize,
    Op,
  } = require('sequelize');
  
const db = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
});
  
db.authenticate();


const Post = db.import('./models/Post');
const Phonenumber = db.import('./models/Phonenumber');

const addPost = async (imageURL, description) => {
	try {
		imageURL = String(imageURL);
		description = String(description);
		const resp = await Post.create({ imageURL, description });
    return { resp, err: null };
	} catch (err) {
		return { resp: null, err }
	}
}

const getAllPosts = async ()  => {
	try {
		const resp = await Post.findAll({ raw: true });
		return { resp, err: null };
	} catch (err) {
		return { resp: null, err };
	}
}

const updatePostWithDescription = async (id, description) => {
  try {
    const resp = await Post.update({ description }, { where: { id } });
    return { resp, err: null };
  } catch (err) {
    return { resp: null, err };
  }
}

const addNumber = async (number) => {
  // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
  const patt = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  const valid = number.search(patt);
  if (valid === -1) {
    return "FAILURE";
  }
  try {
    const resp = await Phonenumber.findOne({ where: { number }});
    if (resp) {
      await Phonenumber.destroy({ where: { number }});
      return "SUCCESS_UNSIGNUP";
    } else {
      await Phonenumber.create({number});
      return "SUCCESS_SIGNUP";
    }
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
}

const getAllNumbers = async () => {
  try {
    const resp = await Phonenumber.findAll({raw: true });
    return { resp, err: null };
  } catch (err) {
    return { resp: null, err };
  }
}

// resync the db.
const sync = async () => {
    await db.sync({ force: true });
};

module.exports = {
  db,
  addPost,
  getAllPosts,
  updatePostWithDescription,
  addNumber,
  getAllNumbers,
  sync,
};
