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


const Post = db.import('./models/Post.js');

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

// resync the db.
const sync = async () => {
    await db.sync({ force: true });
};

module.exports = {
  db,
  addPost,
  getAllPosts,
  updatePostWithDescription,
  sync,
};
