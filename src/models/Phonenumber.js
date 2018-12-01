module.exports = (db, Sequelize) => (
  db.define('number', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: Sequelize.STRING,
    },
  }, {
    underscored: true,
  })
);
