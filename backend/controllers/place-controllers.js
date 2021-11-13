const HttpError = require('../models/http-error')


const {validationResult} = require('express-validator')
const getCoordinates = require('../util/location')
let DUMMY_PLACES = [
    {
        id:'p1',
        title:'Empire state builing',
        description:'Popular sky scapers in the world',
        location:{
            lat:40.7,
            lng:-73.98
        },
        address:'20 W,New York, NY 10001',
        creator:'u1'
    }
]


const getByPlaceId = (req,res,next)=>{
    console.log(req.params)
    const placeId = req.params.placeId
    const returnVal = DUMMY_PLACES.find(place=>place.id===placeId)

    if(!returnVal){
        throw new HttpError('Could not find a place for the provided id',404)
        // return res.status(404).json({message:'Could not find a place for the provided id.'})
    }
    res.json({returnVal})
}

const getByUserId = (req,res,next)=>{
    // console.log(req.params)
    const userId = req.params.uid
    const returnVal = DUMMY_PLACES.filter(place=>place.creator===userId)

    if(returnVal.length===0){
        // return res.status(404).json({message:'Could not find a place for the provided user id.'})
        return next(new HttpError('Could not find a place for the provided user id',404));
    }
    
    res.json({returnVal})
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
    const createdPlace = {
        title,
        description,
        location:coordinates,
        address,
        creator
    }
    // console.log(createdPlace)
    DUMMY_PLACES.push(createdPlace)
    // console.log(DUMMY_PLACES)
    res.status(201).json({message:"Successfully added"})

}

const updatePlace = (req,res,next) =>{

    const error = validationResult(req)

    if(!error.isEmpty()){
        throw new HttpError('Invalid inputs given',422)
    }

    const placeId = req.params.pid

    const placeToBeUpdatedIndex = DUMMY_PLACES.findIndex(place=>place.id===placeId)
    if(placeToBeUpdatedIndex!==-1){
        let mutatePlaceProps = DUMMY_PLACES[placeToBeUpdatedIndex]
        const propsToBeUpdated = req.body

        for(key of Object.keys(propsToBeUpdated)){
            mutatePlaceProps[key] = propsToBeUpdated[key]
        }

        DUMMY_PLACES[placeToBeUpdatedIndex] = mutatePlaceProps

        res.status(201).json({response:DUMMY_PLACES[placeToBeUpdatedIndex]})
    }


}

const deletePlace = (req,res,next) => {

    const placeId = req.params.pid

    const deletePlaceIndex = DUMMY_PLACES.find(place=>place.id===placeId)

    if(deletePlaceIndex){

        DUMMY_PLACES = DUMMY_PLACES.filter(place=>place.id!==placeId)

        res.status(201).json({response:"Deletion successful"})


    }

    throw new HttpError('No place found for the given ID',404);

}
module.exports = {
    getByPlaceId,
    getByUserId,
    createPlace,
    updatePlace,
    deletePlace
}