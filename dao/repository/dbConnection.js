const config = require('../../configs/dbconfig');
const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize(
    config.DB,
    config.USER,
    process.env.DB_PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        dialectOptions: config.dialectOptions,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        logging: config.logging
    }
);

module.exports = {
    connection: connection,
    DataTypes: DataTypes
}