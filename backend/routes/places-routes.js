const express = require('express')

const app = express()


const router = express.Router();

const placeController = require('../controllers/place-controllers')


router.get('/:placeId',placeController.getByPlaceId)

router.get('/user/:uid',placeController.getByUserId)

router.post('/',placeController.createPlace)

module.exports = router