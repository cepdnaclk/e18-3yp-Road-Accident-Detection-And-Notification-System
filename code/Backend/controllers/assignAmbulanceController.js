const ActiveCases = require('../models/activecasesModel');
const asyncHandler = require('express-async-handler');


// @desc check if a accident is assigned to you
// @route POST /api/findaccident
// @access Public
const assignAmbulance = asyncHandler(async (req, res) => {
    const activeCase = await ActiveCases.findOne({"lisencePlateNum":req.body.lisencePlateNum})

    if (!activeCase) {
      res.status(201).json({ state: "Not Active" })
    }
    else if(activeCase.state=="Assigned"){
        res.status(201).json({state:"Assigned"})

    }
    else{
        const assigned =await ActiveCases.updateOne({"lisencePlateNum":req.body.lisencePlateNum},{$set:{state:"Assigned"}})
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
