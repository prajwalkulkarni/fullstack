const HttpError = require('../models/http-error')
const uuid = require('uuid')

const {validationResult} = require('express-validator')
let DUMMY_USERS = [
    {
        id:'u1',
        name:'Prajwal Kulkarni',
        email:'prajwalkulkarni@protonmail.com',
        password:'$tr0ngP@$$w0rd'
        
    }
]

const getAllUsers = (req,res,next)=>{
    // console.log(req.params)
    // const placeId = req.params.placeId
    // const returnVal = DUMMY_PLACES.find(place=>place.id===placeId)

    // if(!returnVal){
    //     throw new HttpError('Could not find a place for the provided id',404)
    //     // return res.status(404).json({message:'Could not find a place for the provided id.'})
    // }
    res.json({users:DUMMY_USERS})
}

const userSignup = (req,res,next)=>{
    // console.log(req.params)

    const error = validationResult(req)
    if(!error.isEmpty()){
        throw new HttpError('Invlaid format of email/password')
    }
    const signUpData = req.body

    const hasUser = DUMMY_USERS.find(user=>user.email===signUpData.email)

    if(hasUser){
        throw new HttpError('Email already exists',422)
    }
    const userData = {...signUpData,id:uuid()}
    
    DUMMY_USERS.push(userData)
    // next({email:signUpData.email,password:signUpData.password})
    res.status(201).json({message:"User registered successfully"})
}

const userLogin = (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        throw new HttpError('Invlaid format of email/password')
    }

    const {email,password} = req.body

    const findUserByEmail = DUMMY_USERS.find(user=>user.email===email)

    if(!findUserByEmail || findUserByEmail.password !== password){
        throw new HttpError('Invalid credentials',401)

    }

    
    res.status(200).json({message:"login successful"})

}


module.exports = {
    getAllUsers,
    userSignup,
    userLogin
}