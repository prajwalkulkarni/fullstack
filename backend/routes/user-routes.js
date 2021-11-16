const express = require('express')

const app = express()

const {check} = require('express-validator')

const router = express.Router();

const userController = require('../controllers/user-controllers')


router.get('/',userController.getAllUsers)

// router.get('/user/:uid',userController.getByUserId)

router.post('/signup',[
    check('email').isEmail(),
    check('password').isLength(5)
],userController.userSignup)

router.post('/login',[
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:5})
],userController.userLogin)

// router.delete('/:pid',userController.deletePlace)

module.exports = router