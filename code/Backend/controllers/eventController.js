const Ambulance = require('../models/ambulanceModel');
const asyncHandler = require('express-async-handler');


const findAmbulance =asyncHandler(async(req,res) =>{
    const{longitude,latitude,device,activeStatus} = req.body;

    if(!longitude || !latitude || !device || !activeStatus){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    try{

        const latitude=req.body.latitude;
        const longitude=req.body.longitude;

        const find_ambulances = await Ambulance.aggregate([
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

        res.status(200).send({success:true, msg:"Ambulance details", data:find_ambulances});

    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }

});

module.exports = {
    findAmbulance
  }

