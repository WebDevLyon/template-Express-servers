const express = require('express')
const router = express.Router()  

// Middleware si nécessaire
const userController = require('../controllers/user.js')

//Routage with controllers
router.post('/register', userController.register)
router.post('login', userController.login)

// Export
module.exports = router