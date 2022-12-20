const mongoose = require('mongoose')

const accidentSchema = mongoose.Schema({
    deviceNum:{
        type: String,
        required: [true, 'Please add device number'],
    },

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
    
    coordinates: {
        type: [Number],
        index: '2dsphere'
    },      
},

{
    timestamps:true
})

module.exports = mongoose.model('Accident',accidentSchema);