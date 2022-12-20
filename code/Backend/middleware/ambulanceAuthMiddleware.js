const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Ambulance = require('../models/ambulanceModel')

const protect = asyncHandler(async(req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify Token
            const decoded =jwt.verify(token,process.env.JWT_SECRET)
    
            //Get user from token
            req.ambulance = await Ambulance.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            console.log(error)
            res.status(401) // not authorized
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}