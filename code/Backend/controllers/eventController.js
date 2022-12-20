const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');

//added new
// @desc Get Acci
// @route POST /api/users/location
// @access Public
const findAmbulance =asyncHandler(async(req,res) =>{
    const{longitude,latitude,device,activeStatus} = req.body;

    if(!longitude || !latitude || !device || activeStatus){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    try{

        const latitude=req.body.latitude;
        const longitude=req.body.longitude;

        const find_ambulance=await Ambulance.aggragate([
            {
                $geoNear:{
                    near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",
                    maxDistance:parseFloat(1000)*1609,
                    distanceField:"dist.calculated",
                    spherical:true
                }
            }
        ]);

    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }

})

