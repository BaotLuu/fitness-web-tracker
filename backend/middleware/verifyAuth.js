const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyAuth = async (req,res,next )=>{

    //check auth
    const {authorization} = req.headers

    const token = authorization.split(' ')[1]
    
    //primary key
    try{
     const {_id} =   jwt.verify(token,process.env.SECRET)

     req.user = await User.findOne({_id}).select('_id')
     next()
    }catch(error){
        res.status(401).json({error:'Not authorized'})
    }

}

module.exports = verifyAuth