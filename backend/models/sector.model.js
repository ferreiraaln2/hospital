module.exports = (sequelize, Sequelize) => {
  const Sector = sequelize.define("sector", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  return Sector;
}; 