const express = require('express')
const router = express.Router()
const{addAccident} = require('../controllers/accidentController')

const {protect} = require('../middleware/driverAuthMiddleware')

router.post('/',addAccident);

module.exports = router