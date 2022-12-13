const express = require('express')
const router = express.Router()
const{registerDriver,loginDriver, getMe} = require('../controllers/driverController')

const {protect} = require('../middleware/authMiddleware')

router.post('/',registerDriver);
router.post('/login',loginDriver);
router.get('/me',protect,getMe);

module.exports = router