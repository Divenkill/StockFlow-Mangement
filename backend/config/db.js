const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,

    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(
          process.env.DB_SSL_CA_PATH ||
          path.join(__dirname, '../certificates/ca.pem')
        ),
        rejectUnauthorized: true,
      },
    },
  }
);

async function initializeDatabase() {
  await sequelize.authenticate();
  await sequelize.sync();

  console.log('Aiven MySQL connected, tables ready');
}

module.exports = { sequelize, initializeDatabase };