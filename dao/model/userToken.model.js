const defineUserToken = (conn, DataTypes) => {
    const UserToken = conn.define('userToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
    return UserToken;
};

module.exports = defineUserToken;