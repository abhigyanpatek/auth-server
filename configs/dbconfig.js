require('dotenv').config();
module.exports = {
    HOST: process.env.DB_URI,
    USER: process.env.DB_USER,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false,
      },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
}