const express = require('express')
const router = express.Router()
const{addAccident} = require('../controllers/accidentController')

const{findAmbulance} = require('../controllers/eventController')

const {protect} = require('../middleware/driverAuthMiddleware')

router.post('/',addAccident);
router.post('/getambulance', findAmbulance);

module.exports = router