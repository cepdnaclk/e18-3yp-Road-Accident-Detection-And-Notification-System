const Ambulance = require('../models/ambulanceModel');
const Driver = require('../models/driverModel');
const EmergencyContact = require('../models/emergencyContactModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Authenticate a User
// @route POST /api/ogin
// @access Public
const login =asyncHandler( async(req,res) =>{
    const {email,password} = req.body

    const driver = await Driver.findOne({email})
    const ambulance = await Ambulance.findOne({email})
    const emergencyContact = await EmergencyContact.findOne({email})

    if(driver &&(await bcrypt.compare(password, driver.password))){
        res.json({
            _id:driver.id,
            fname:driver.fname,
            lname:driver.lname,
            nic:driver.nic,
            email:driver.email,
            telNum:driver.telNum,
            vehicleType:driver.vehicleType,
            lisencePlateNum:driver.lisencePlateNum,
            deviceNum:driver.deviceNum,
            emergency: driver.emergency,
            token:generateToken(driver._id),
            userState: 1,
        })
    } else if(ambulance &&(await bcrypt.compare(password, ambulance.password))){
        res.json({
            _id:ambulance.id,
            fname:ambulance.fname,
            lname:ambulance.lname,
            nic:ambulance.nic,
            email:ambulance.email,
            telNum:ambulance.telNum,
            hospital:ambulance.hospital,
            lisencePlateNum:ambulance.lisencePlateNum,
            token:generateToken(ambulance._id),
            userState: 0,
        })
    } else if(emergencyContact &&(await bcrypt.compare(password, emergencyContact.password))){
        res.status(200).json({
            _id:emergencyContact.id,
            fname:emergencyContact.fname,
            lname:emergencyContact.lname,
            nic:emergencyContact.nic,
            email:emergencyContact.email,
            telNum:emergencyContact.telNum,
            token:generateToken(emergencyContact._id),
            userState: 2,
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
});

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}


module.exports = {
    login
}