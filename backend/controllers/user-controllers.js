const HttpError = require('../models/http-error')
// const uuid = require('uuid')

const {validationResult} = require('express-validator')
const User = require('../models/user')


const getAllUsers = async(req,res,next)=>{
    
    let allUsers
    try{
        allUsers = await User.find({},'-password')
    }
    catch(err){
        const error = new HttpError('Fetching users failed, please try again',500)

        return next(error)
    }
    res.json({users:allUsers.map(user=>user.toObject({getters:true}))})
}

const userSignup = async(req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return next(new HttpError('One or more fields empty or invalid.'))
    }
    const signUpData = req.body
    let existingUser
    try{
        existingUser = await User.findOne({email:signUpData.email})
    } catch(err){
        const error = new HttpError('Signing up failed',500)

        return next(error)
    }

    if(existingUser){
        return next(new HttpError('User exists already, please login instead'))
    }

    let createUser
    try{
        createUser = new User({...signUpData,image:'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',places:[]})
        await createUser.save()
    
    }
    catch(err){
        const error = new HttpError('Creating user failed, please try again')

        return next(error)
    }

    res.status(201).json({createUser:createUser.toObject({getters:true})})
}

const userLogin = async(req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        throw new HttpError('Invalid format of email/password')
    }

    const {email,password} = req.body

    try{
        existingUser = await User.findOne({email:email})
    } catch(err){
        const error = new HttpError('Logging in failed',500)

        return next(error)
    }

    
    if(!existingUser || existingUser.password !== password){
        return next(new HttpError('Invalid credentials',401))

    }

    
    res.status(200).json({message:"login successful"})

}


module.exports = {
    getAllUsers,
    userSignup,
    userLogin
}