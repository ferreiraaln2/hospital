module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("doctor", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    crm: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    specialty: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return Doctor;
}; 