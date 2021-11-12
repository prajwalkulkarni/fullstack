const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
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

    if(!returnVal){
        // return res.status(404).json({message:'Could not find a place for the provided user id.'})
        return next(new HttpError('Could not find a place for the provided user id',404));
    }
    
    res.json({returnVal})
}

const createPlace = (req,res,next)=>{

    const {title,description,coordinates,address,creator} = req.body

    const createdPlace = {
        title,
        description,
        location:coordinates,
        address,
        creator
    }
    console.log(createdPlace)
    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({message:"Successfully added"})

}
module.exports = {
    getByPlaceId,
    getByUserId,
    createPlace
}