const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return  jwt.sign({_id:id}, process.env.SECRET,{expiresIn:'1d'})
}

//login
const login = async (req,res) => {
    const {userName,password} = req.body
    try{
        const user = await User.login(userName,password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({userName,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
   
}

//signup
const signup = async (req,res) => {
    const {userName,password} = req.body
    try{
        const user = await User.signup(userName,password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({userName,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
  
}

module.exports ={login,signup}