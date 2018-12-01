module.exports = (db, Sequelize) => (
  db.define('post', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageURL: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  }, {
    underscored: true,
  })
);
