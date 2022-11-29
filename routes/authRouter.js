const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post("/getUserToken", authController.getUserToken);
router.post("/refresh", authController.fetchNewAccessToken);
router.get("/validate", authController.validate);

module.exports = router;