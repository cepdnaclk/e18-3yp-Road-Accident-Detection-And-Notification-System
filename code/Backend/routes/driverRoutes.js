const express = require('express')
const router = express.Router()
const{registerDriver,loginDriver, getMe, removeMe, updateMe, addEmergency,removeEmergency} = require('../controllers/driverController')

const {protect} = require('../middleware/driverAuthMiddleware')

router.post('/',registerDriver);
router.post('/login',loginDriver);
router.get('/me',protect,getMe);
router.delete('/me',protect,removeMe);
router.put('/me',protect,updateMe);
router.put('/addemergency',protect,addEmergency);
router.put('/removeemergency/:phoneNum',protect,removeEmergency);

module.exports = router