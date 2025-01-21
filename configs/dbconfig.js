require('dotenv').config();
module.exports = {
    HOST: process.env.DB_URI,
    PORT: 3306,
    USER: process.env.DB_USER,
    DB: 'ecom_db',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
}