const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const placesRouter = require('./routes/places-routes')


app.use('/api/places',placesRouter)

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }

    res.status(error.code ?? 500).json(({message:error.message || 'An unknown error occured' }))
})

app.listen(1337)



