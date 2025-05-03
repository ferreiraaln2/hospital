module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patient", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    birthDate: {
      type: Sequelize.DATEONLY
    },
    gender: {
      type: Sequelize.ENUM('M', 'F', 'O')
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    medicalRecord: {
      type: Sequelize.TEXT
    }
  });

  return Patient;
}; 