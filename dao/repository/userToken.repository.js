const dbConnection = require('./dbConnection');
const defineUserToken = require('../model/userToken.model');
const {Op} = require('sequelize');

const UserToken = defineUserToken(dbConnection.connection, dbConnection.DataTypes);

const createUserTokenTable = async () => {
    await UserToken.sync();
}

const createUserToken = async (user) => {
    return await UserToken.create(user);
}

const isValidUserToken = async (user) => {
    const storedToken = await UserToken.findOne({
        where: {
            [Op.and]: [
                {username: user.username},
                {refreshToken: user.refreshToken}
            ]
        }
    });
    return !storedToken? false: true;
}

module.exports = {
    createUserTokenTable,
    createUserToken,
    isValidUserToken
}