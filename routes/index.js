const express = require('express')
const router = express.Router()  

// Middleware si nécessaire
const user = require('../controllers/user.js')

//Routage with controllers
router.post('/register', user.register)


// Export
module.exports = router