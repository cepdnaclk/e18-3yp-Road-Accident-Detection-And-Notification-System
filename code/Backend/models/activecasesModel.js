const mongoose = require('mongoose')

const activecasesSchema = mongoose.Schema({

    lisencePlateNum:{
        type: String,
        required: [true, 'Please add a Licence Plate Number'],
        unique:true
    },
    deviceNum:{
        type: String,
        required: [true, 'Please device number'],
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
        required: [true, 'Please add state']
    },
    patientCondition:{
        type: String,
        required: [true, 'Please state the condition of the patient']
    }
},
{
    timestamps:true
})


module.exports = mongoose.model('ActiveCases',activecasesSchema);