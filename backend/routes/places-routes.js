const express = require('express')

const app = express()
const {check} = require('express-validator')


const router = express.Router();

const placeController = require('../controllers/place-controllers')


router.get('/:placeId',placeController.getByPlaceId)

router.get('/user/:uid',placeController.getByUserId)

router.post('/',[
    check('title').not().isEmpty(),
    check('description').isLength({min:10}),
    check('address').not().isEmpty()
],placeController.createPlace)

router.patch('/:pid',placeController.updatePlace)

router.delete('/:pid',placeController.deletePlace)

module.exports = router