const express = require('express')
const serverless = require('serverless-http')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const newRouter = require('./router')

// Router so we can use netlify
const router = express.Router()

// Setup lambda function
app.use(bodyParser.json())
app.use('/.netlify/functions/server', newRouter) // path must route to lambda

module.exports = app
module.exports.handler = serverless(app)
