const mongoose = require('mongoose')


const PlacesSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:false},
    location:{
        lat: {type:Number,required: true},
        lng: {type:Number,required: true}
    },
    address:{type:String,required:true},
    creator:{type:String,required:true}
})

const PlaceModel = mongoose.model('Place',PlacesSchema)

module.exports = PlaceModel