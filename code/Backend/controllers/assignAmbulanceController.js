const ActiveCases = require('../models/activecasesModel');
const Accident = require('../models/accidentModel');
const Driver = require('../models/driverModel');
const asyncHandler = require('express-async-handler');


// @desc check if a accident is available to you
// @route POST /api/ambulances/findaccident/
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
        const deviceNum=activeCase.deviceNum
        const personal=await Driver.findOne({"deviceNum":deviceNum})
        res.status(201).json({
            state: "Active",
            lisencePlateNum:activeCase.lisencePlateNum,
            longitude:activeCase.longitude,
            latitude:activeCase.latitude,
            fname:personal.fname,
            lname:personal.lname,
            phoneNum:personal.telNum,
            patientCondition:activeCase.patientCondition,
            nic:activeCase.nic

        })
    }
})

// @desc assign the ambulance 
// @route POST /api/ambulances/acceptaccident
// @access Public
const acceptAmbulance = asyncHandler(async (req, res) => {
    const activeCase = await ActiveCases.findOne({"lisencePlateNum":req.body.lisencePlateNum})

    if (!activeCase) {
      res.status(201).json({ state: "Not Active" })
    }

    else{
        const assigned =await ActiveCases.updateOne({"lisencePlateNum":req.body.lisencePlateNum},{$set:{state:"Assigned"}})
        res.status(201).json({
            state: "Assigned",
        })
    }
})

// @desc response after the patient is delivered to the hospital
// @route POST /api/ambulances/responseaccident 
// @access Public
const ResponseAccident = asyncHandler(async (req, res) => {
    const responseCase = await ActiveCases.findOne({"lisencePlateNum":req.body.lisencePlateNum})

    if (!responseCase) {
      res.status(201).json({ state: "There's no assigned case" })
    }
    else if(responseCase.state=="Assigned"){
        const deviceNum=responseCase.deviceNum
        const deleted =await ActiveCases.deleteOne({"lisencePlateNum":req.body.lisencePlateNum})
        const updated =await Accident.updateOne({"deviceNum":deviceNum,"activeState":"Active"},{$set:{activeState:"Completed"}})
        res.status(201).json({
            state: "Updated.Job well done"  
        })      
    }
    else{
        res.status(201).json({
            state: "The case is not assigned yet"
        })
    }
})


module.exports = {
    assignAmbulance,
    ResponseAccident,
    acceptAmbulance
}
