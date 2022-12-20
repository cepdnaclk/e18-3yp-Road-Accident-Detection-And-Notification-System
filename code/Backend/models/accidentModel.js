const mongoose = require('mongoose')

const accidentSchema = mongoose.Schema({
    deviceNum:{
        type: String,
        required: [true, 'Please add device number'],
    },
    activeState:{
        type: String,
        required: [true, 'Please add active state']
    },
    longitude:{
        type: String,
        required: [true, 'Please add longitude']
    },
    latitude:{
        type: String,
        required: [true, 'Please add latitude']
    }

    // emergency:[{
    //         name: {
    //             type: String
    //     },
    //         phoneNum:{
    //             type: String,
    //     }
    // }],
    // location: {
    //     type: {
    //       type: String,
    //       enum: ['Point']
    //     },
    //     coordinates: {
    //       type: [Number],
    //       index: '2dsphere'
    //     },
    //     formattedAddress: String
    // } 
         
},

{
    timestamps:true
})

module.exports = mongoose.model('Accident',accidentSchema);