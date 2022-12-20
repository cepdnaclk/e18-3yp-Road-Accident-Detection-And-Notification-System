const Accident = require('../models/accidentModel');
const asyncHandler = require('express-async-handler');

// @desc Add Accident to databse
// @route POST /api/accident
// @access Public
const addAccident =asyncHandler(async(req,res) =>{
    try {
        const accident = await Accident.create(req.body);
    
        return res.status(200).json({
          success: true,
          data: accident
        });

      } catch (err) {
          return res.status(400).json({ err });
      }
});

module.exports = {
    addAccident
}