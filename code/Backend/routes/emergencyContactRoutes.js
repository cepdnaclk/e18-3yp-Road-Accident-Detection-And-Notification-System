const express = require('express')
const router = express.Router()
const{registerEmergencyContact, loginEmergencyContact,getMe,removeMe,updateMe,emergeAccident} = require('../controllers/emergencyContactController')

const {protect} = require('../middleware/emergencyContactAuthMiddleware')

router.post('/',registerEmergencyContact);
router.post('/login',loginEmergencyContact);
router.get('/me',protect,getMe);
router.delete('/me',protect,removeMe);
router.put('/me',protect,updateMe);


module.exports = router