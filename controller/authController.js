const userTokenRepository = require('../dao/repository/userToken.repository');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const {randomBytes} = require('crypto');
const blackListedTokens = {};

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
        return res.status(400).send({
            message: "Token hasn't expired yet!"
        });
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
        return res.status.send({
            message: "Token is required!"
        });
    }
    if(blackListedTokens[accessToken]){
        return res.status(401).send({
            message: "Token is revoked!"
        });
    }

    jwt.verify(accessToken, authConfig.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err){
            return res.status(401).send({
                message: err.message
            });
        }
        res.status(200).send(payload);
    });
}

const validateAndDeleteUserToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];

    if(!accessToken){
        return res.status.send({
            message: "Token is required!"
        });
    }
    
    jwt.verify(accessToken, authConfig.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err){
            return res.status(401).send({
                message: err.message
            });
        }
        userTokenRepository.fetchUserToken({
            where: {
                username: payload.username
            }
        }).then(userToken => {
            userToken.destroy();
        }).then(() => {
            blackListedTokens[accessToken] = true;
            res.sendStatus(200);
        }).catch(error => {
            console.log("Error occured!", error.message);
            res.status(500).send({
                message: "Couldn't complete request. Please try again after sometime!"
            });
        })
    })
}

module.exports = {
    getUserToken,
    fetchNewAccessToken,
    validate,
    validateAndDeleteUserToken
}