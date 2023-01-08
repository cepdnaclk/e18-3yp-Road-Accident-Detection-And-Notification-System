const express = require('express')
const router = express.Router()
const{login} = require('../controllers/loginController')

//const {protect} = require('../middleware/driverAuthMiddleware')

router.post('/login',login);

module.exports = router