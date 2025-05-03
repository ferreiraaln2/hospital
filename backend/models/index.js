const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.sectors = require('./sector.model.js')(sequelize, Sequelize);
db.patients = require('./patient.model.js')(sequelize, Sequelize);
db.doctors = require('./doctor.model.js')(sequelize, Sequelize);

// Definir relações
db.sectors.hasMany(db.patients, { as: 'patients' });
db.patients.belongsTo(db.sectors, {
  foreignKey: 'sectorId',
  as: 'sector'
});

db.sectors.hasMany(db.doctors, { as: 'doctors' });
db.doctors.belongsTo(db.sectors, {
  foreignKey: 'sectorId',
  as: 'sector'
});

module.exports = db; 