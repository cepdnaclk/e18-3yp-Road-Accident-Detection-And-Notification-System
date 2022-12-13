const Driver = require('../models/driverModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');

// @desc Register Driver
// @route POST /api/drivers
// @access Public
const registerDriver =asyncHandler(async(req,res) =>{
    const{fname,lname,nic, email, telNum, vehicleType, lisencePlateNum, deviceNum, password} = req.body;

    if(!fname || !lname || !nic|| !email || !telNum || !vehicleType || !lisencePlateNum || !deviceNum || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if driver exists
    const driverExists = await Driver.findOne({email})

    if(driverExists){
        res.status(400)
        throw new Error('Driver already Exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create driver
    const driver = await Driver.create({
        fname,lname,nic, email, telNum, vehicleType, lisencePlateNum, deviceNum,
        password:hashedPassword
    })

    if(driver){
        res.status(201).json({
            _id:driver.id,
            fname:driver.fname,
            lname:driver.lname,
            nic:driver.nic,
            email:driver.email,
            telNum:driver.telNum,
            vehicleType:driver.vehicleType,
            lisencePlateNum:driver.lisencePlateNum,
            deviceNum:driver.deviceNum,
            token:generateToken(driver._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid driver Data')
    }
})

// @desc Authenticate a Driver
// @route POST /api/drivers/login
// @access Public
const loginDriver =asyncHandler( async(req,res) =>{
    const {email,password} = req.body

    const driver = await Driver.findOne({email})

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
            token:generateToken(driver._id),
        })
    } else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @desc Get Driver data
// @route GET /api/drivers/me
// @access Public
const getMe = asyncHandler( async(req,res) =>{
   
    const{_id,fname,lname,nic, email, telNum, vehicleType, lisencePlateNum, deviceNum} = await Driver.findById(req.driver.id)

    res.status(200).json({
        id:_id,
        fname,
        lname,
        nic,
        email,
        telNum,
        vehicleType,
        lisencePlateNum,
        deviceNum,
    })
});

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports = {
    registerDriver,
    loginDriver,
    getMe
}