const mongoose = require('mongoose')

const activecasesSchema = mongoose.Schema({

    lisencePlateNum:{
        type: String,
        required: [true, 'Please add a Licence Plate Number'],
        unique:true
    },
    longitude:{
        type: String,
        required: [true, 'Please add longitude']
    },
    latitude:{
        type: String,
        required: [true, 'Please add latitude']
    },
    state:{
        type: String,
        required: [true, 'Please add latitude']
    }
},
{
    timestamps:true
})


module.exports = mongoose.model('ActiveCases',activecasesSchema);