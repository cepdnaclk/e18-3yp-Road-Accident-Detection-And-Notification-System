const Driver = require('../models/driverModel');
const EmergencyContact = require('../models/emergencyContactModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
            userState: 1,
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
            emergency: driver.emergency,
            token:generateToken(driver._id),
        })
    } else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @desc Get Driver data
// @route GET /api/drivers/me
// @access Private
const getMe = asyncHandler( async(req,res) =>{
   
    const{_id,fname,lname,nic, email, telNum, vehicleType, lisencePlateNum, deviceNum,emergency} = await Driver.findById(req.driver.id)

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
        emergency,
    })
});

// @desc Delete Driver data
// @route DELETE /api/drivers/me
// @access Private
const removeMe = asyncHandler( async(req,res) =>{
   
    const driver = await Driver.findById(req.driver.id);
    
    driver.remove()
    res.status(200).json({ 
            id: req.driver.id,
            message: "Driver Successfully Deleted"
        })
});

// @desc Update Driver data
// @route PUT /api/drivers/me
// @access Private
const updateMe = asyncHandler( async(req,res) =>{
    
    const updatedDriver = await Driver.findByIdAndUpdate(req.driver.id, req.body, {
        new:true,
    });

    res.status(200).json(updatedDriver);
 
});

// @desc Update driver data with emergency contacts
// @route PUT /api/drivers/addemergency
// @access Private
const addEmergency = asyncHandler( async(req,res) =>{

    console.log(JSON.stringify(req.body.emergency))
    
    if(req.body.emergency){
        console.log("HIIIId")
        console.log(req.driver.id)

        const emergencyContact = await Driver.findOne({"_id":req.driver.id, "emergency.phoneNum":req.body.emergency.phoneNum});
        
        if(emergencyContact){
            res.status(400)
            throw new Error("Emergency Contact Already Exists")
        }

        const updatedDriver = await Driver.updateOne({ _id: req.driver.id }, { $push: { 
            emergency: {
                name:req.body.emergency.name,
                phoneNum:req.body.emergency.phoneNum
            }
        } 
    });

    const isInEmergencyContactCollection = await EmergencyContact.findOne({"telNum":req.body.emergency.phoneNum})
    
    if(isInEmergencyContactCollection){
        await EmergencyContact.updateOne({_id: isInEmergencyContactCollection.id},{ $push: { 
            driver:req.driver.id
        } 
    })
}
    res.status(200).json(await Driver.findById(req.driver.id))
    return;

}
});

// @desc Remove emergency contact from driver details
// @route PUT /api/drivers/removeemergency/:phoneNum
// @access Private
const removeEmergency = asyncHandler(async(req,res) =>{

    const emergencyContact = await Driver.findOne({"_id":req.driver.id, "emergency.phoneNum":req.params.phoneNum});
    
    if(!emergencyContact){
        res.status(400)
        throw new Error("Emergency Contact Not Found")
    }

    const updatedDriver = await Driver.updateOne({ _id: req.driver.id }, { $pull: { 
                    emergency: {
                        phoneNum:req.params.phoneNum
                    }
        } 
    });

    const isInEmergencyContactCollection = await EmergencyContact.findOne({"telNum":req.params.phoneNum})
    
        if(isInEmergencyContactCollection){
        await EmergencyContact.updateOne({_id: isInEmergencyContactCollection.id},{ $pull: { 
            driver:req.driver.id
        } 
    }
);
}
    res.status(200).json(await Driver.findById(req.driver.id));
    return;

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
    getMe,
    removeMe,
    updateMe,
    addEmergency,
    removeEmergency
}