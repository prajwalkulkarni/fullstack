const HttpError = require('../models/http-error')


const {validationResult} = require('express-validator')
const getCoordinates = require('../util/location')
const Place = require('../models/place')


const getByPlaceId = async(req,res,next)=>{
    console.log(req.params)
    const placeId = req.params.placeId
    
    let place
    try{
        place = await Place.findById(placeId)
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not find a place',
        500)

        return next(error)
    }
    
    if(!place){
        throw new HttpError('Could not find a place for the provided id',404)
    }
    res.json({place:place.toObject({getters:true})})
}

const getByUserId = async(req,res,next)=>{
    // console.log(req.params)
    const userId = req.params.uid
    
    let placesById
    
    try{
        placesById = await Place.find({creator:userId})
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not find a place',
        500)

        return next(error)
    }
    
    
    res.json({placesById:placesById.map(place=>place.toObject({getters:true}))})
}

const createPlace = async(req,res,next)=>{

    const error = validationResult(req)

    if(!error.isEmpty()){
       return next(new HttpError('Invalid inputs given',422))
    }

    const {title,description,address,creator} = req.body

    let coordinates;

    try{
        coordinates = await getCoordinates(address)
    }catch(error){
        return next(error)
    }
    const createdPlace = new Place({
        title,
        description,
        location:coordinates,
        address,
        creator,
        image:'https://lh5.googleusercontent.com/p/AF1QipPNYKu1SitKYE1uO_NrbfLa7LJMf1m5eD4p1D0y=w408-h272-k-no'
    })
    try{
        await createdPlace.save()
    }
    catch(err){
        const error = new HttpError('Creating place failed, please try again')

        return next(error)
    }
    
    
    res.status(201).json({message:"Successfully added"})

}

const updatePlace = async(req,res,next) =>{

    const error = validationResult(req)

    const {title,description} =req.body

    if(!error.isEmpty()){
        return next(new HttpError('Invalid inputs given',422))
    }

    const placeId = req.params.pid
    let place
    try{
        place = await Place.findById(placeId)
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not find a place',
        500)

        return next(error)
    }

    place.title = title
    place.description = description

    try{
        await place.save()
    }catch(err){
        const error = new HttpError('Something went wrong, could not find a place',
        500)

        return next(error)
    }

    res.status(200).json({place:place.toObject({getters:true})})
    

}

const deletePlace = async(req,res,next) => {

    const placeId = req.params.pid
    let place

    try{
        place = await Place.findById(placeId)
    }catch(err){
        const error = new HttpError('Something went wrong, could not delete place',
        500)
        return next(error)
    }

    try{
        place.remove()
    }catch(err){
        const error = new HttpError('Something went wrong, could not delete place',
        500)
        return next(error)
    }

    res.status(200).json({message:"Place deleted."})
}
module.exports = {
    getByPlaceId,
    getByUserId,
    createPlace,
    updatePlace,
    deletePlace
}