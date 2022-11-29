const userTokenRepository = require('../dao/repository/userToken.repository');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const {randomBytes} = require('crypto');

function getRefreshToken() {
    return randomBytes(64).toString('hex');
}

function getAccessToken(payload) {
    const jitter = parseInt(Math.random()*120);
    const expiryTime = 600 + jitter;
    return jwt.sign(payload, authConfig.ACCESS_TOKEN_SECRET, 
        {expiresIn: `${expiryTime}s`});
}

const getUserToken = (req, res) => {
    const payload = req.body;
    const accessToken = getAccessToken(payload);
    const refreshToken = getRefreshToken();

    userTokenRepository.createUserToken({
        username: payload.username,
        refreshToken: refreshToken
    }).then(result => {
        console.log("Token saved in DB successfully!");
        res.status(200).send({
            accessToken,
            refreshToken
        });
    })
    .catch(error => {
        console.log("Error in saving request", error.message);
        res.status(500).send({
            message: "Couldn't complete request. Please try again after sometime!"
        });
    })
}

const fetchNewAccessToken = (req, res) => {
    const accessToken = req.body.accessToken;
    const payload = jwt.decode(accessToken);

    // if token hasn't expired
    if(Date.now() < payload.exp*1000){
        res.status(204).send();
        return;
    }

    userTokenRepository.isValidUserToken({
        username: payload.username,
        refreshToken: req.body.refreshToken
    })
    .then(result => {
        if(!result){
            res.sendStatus(401);
            return;
        }
        res.status(200).send({
            accessToken: getAccessToken({
                username: payload.username,
                permission: payload.permission
            }),
            refreshToken: req.body.refreshToken
        });
    })
    .catch(error => {
        console.log("Error occured!", error.message);
        res.status(500).send({
            message: "Couldn't complete request. Please try again after sometime!"
        });
    })
}

const validate = (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];

    if(!accessToken){
        res.sendStatus(401);
        return;
    }

    jwt.verify(accessToken, authConfig.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err){
            res.sendStatus(403);
            return;
        }
        res.status(200).send(payload);
    });
}

module.exports = {
    getUserToken,
    fetchNewAccessToken,
    validate
}