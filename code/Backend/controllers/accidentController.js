const Accident = require('../models/accidentModel');
const ActiveCases = require('../models/activecasesModel');
const Driver = require('../models/driverModel');
const asyncHandler = require('express-async-handler');

const Ambulance = require('../models/ambulanceModel');

// @desc Add Accident to databse
// @route POST /api/accident
// @access Public
const addAccident =asyncHandler(async(req,res) =>{
  const{longitude,latitude,deviceNum,activeState} = req.body; 
  
  if(!longitude || !latitude || !deviceNum || !activeState){
    res.status(400)
    throw new Error('Please add all fields')
}
  try {
        const closetContacts= await Driver.findOne({"deviceNum":req.body.deviceNum}) 

        const accident = await Accident.create(req.body);


        const latitude=req.body.latitude;
        const longitude=req.body.longitude;
        const deviceNum=req.body.deviceNum;


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


        const lisencePlateNum = find_ambulances[0]["lisencePlateNum"];


        const activeCases = await ActiveCases.create({
            lisencePlateNum,
            deviceNum,
            longitude, 
            latitude,
            state:"Active"
            
        });



        res.status(200).json(closetContacts.emergency);
        return;

      } catch (err) {
          return res.status(400).json({ err });
      }
});

module.exports = {
    addAccident
}