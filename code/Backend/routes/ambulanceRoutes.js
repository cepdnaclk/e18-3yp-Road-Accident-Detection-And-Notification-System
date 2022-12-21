const express = require('express')
const router = express.Router()
const{registerAmbulance, loginAmbulances, getMe, removeMe,updateMe} = require('../controllers/ambulanceController')
const{assignAmbulance} = require('../controllers/assignAmbulanceController')

const {protect} = require('../middleware/ambulanceAuthMiddleware')

router.post('/',registerAmbulance);
router.post('/login',loginAmbulances);
router.get('/me',protect,getMe);
router.delete('/me',protect,removeMe);
router.put('/me',protect,updateMe);
router.get('/findaccident',assignAmbulance);


module.exports = router