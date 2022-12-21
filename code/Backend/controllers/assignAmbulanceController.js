const ActiveCases = require('../models/activecasesModel');
const asyncHandler = require('express-async-handler');

const assignAmbulance = asyncHandler(async (req, res) => {
    const activeCase = await ActiveCases.findOne({"lisencePlateNum":req.params.lisencePlateNum})
  
    if (!activeCase) {
      res.status(201).json({ state: "Not Active" })
    }
    else{
        res.status(201).json({
            state: "Active",
            lisencePlateNum:activeCase.lisencePlateNum,
            longitude:activeCase.longitude,
            latitude:activeCase.latitude
        })
    }
})

module.exports = {
    assignAmbulance
}
