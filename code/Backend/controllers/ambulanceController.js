const Ambulance = require('../models/ambulanceModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Register Ambulance
// @route POST /api/ambulances
// @access Public
const registerAmbulance =asyncHandler(async(req,res) =>{
    const{fname,lname,nic, email, telNum, hospital, lisencePlateNum, password} = req.body;

    if(!fname || !lname || !nic|| !email || !telNum || !hospital || !lisencePlateNum || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if ambulance exists
    const ambulanceExists = await Ambulance.findOne({email})

    if(ambulanceExists){
        res.status(400)
        throw new Error('Driver already Exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create ambulance
    const ambulance = await Ambulance.create({
        fname,lname,nic, email, telNum, hospital, lisencePlateNum,
        password:hashedPassword
    })

    if(ambulance){
        res.status(201).json({
            _id:ambulance.id,
            fname:ambulance.fname,
            lname:ambulance.lname,
            nic:ambulance.nic,
            email:ambulance.email,
            telNum:ambulance.telNum,
            lisencePlateNum:ambulance.lisencePlateNum,
            hospital:ambulance.hospital,
            token:generateToken(ambulance._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid Ambulance Data')
    }
})

// @desc Authenticate a Ambulance
// @route POST /api/ambulances/login
// @access Public
const loginAmbulances =asyncHandler( async(req,res) =>{
    const {email,password} = req.body

    const ambulance = await Ambulance.findOne({email})

    if(ambulance &&(await bcrypt.compare(password, ambulance.password))){
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
        })
    } else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @desc Get Ambulance data
// @route GET /api/ambulances/me
// @access Private
const getMe = asyncHandler( async(req,res) =>{
   
    const{_id,fname,lname,nic, email, telNum, hospital, lisencePlateNum, } = await Ambulance.findById(req.ambulance.id)

    res.status(200).json({
        id:_id,
        fname,
        lname,
        nic,
        email,
        telNum,
        hospital,
        lisencePlateNum,
    })
});


// @desc Delete Driver data
// @route DELETE /api/ambulances/me
// @access Private
const removeMe = asyncHandler( async(req,res) =>{
   
    const ambulance = await Ambulance.findById(req.ambulance.id);
    
    ambulance.remove()
    res.status(200).json({ 
            id: req.ambulance.id,
            message: "Ambulance Successfully Deleted"
        })
});


// @desc Update Driver data
// @route PUT /api/ambulances/me
// @access Private
const updateMe = asyncHandler( async(req,res) =>{
    
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(req.ambulance.id, req.body, {
        new:true,
    });

    res.status(200).json(updatedAmbulance);
 
});




//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports = {
    registerAmbulance,
    loginAmbulances,
    getMe,
    removeMe,
    updateMe
}