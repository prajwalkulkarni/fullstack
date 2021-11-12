const express = require('express')

const app = express()


const router = express.Router();

const userController = require('../controllers/user-controllers')


router.get('/',userController.getAllUsers)

// router.get('/user/:uid',userController.getByUserId)

router.post('/signup',userController.userSignup)

router.post('/login',userController.userLogin)

// router.delete('/:pid',userController.deletePlace)

module.exports = router