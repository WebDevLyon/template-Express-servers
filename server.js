const express = require('express')
const cors = require('cors')

// Database json si nécessaire
const fs = require('fs')
const events = require('./db/events.json')

//Routes
const nameRouter = require("./routes/index.js")
const app = express()

app.use(cors())
app.use(express.json())

//Routage 
app.use("/")
