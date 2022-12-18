const mongoose = require('mongoose')

const emergencyContactSchema = mongoose.Schema(
    {
    driver:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',
          }],
    fname:{
        type: String,
        required: [true, 'Please add a first name']
    },
    lname:{
        type: String,
        required: [true, 'Please add a last name']
    },
    email:{
        type: String,
        required: [true, 'Please add an email'], 
        unique:true
    },
    nic:{
        type: String,
        required: [true, 'Please add a NIC'],
        unique:true
    },
    telNum:{
        type: String,
        required: [true, 'Please add an telephone number'], 
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Please add a password']
    },
},
{
    timestamps:true
})

module.exports = mongoose.model('EmergencyContact',emergencyContactSchema);