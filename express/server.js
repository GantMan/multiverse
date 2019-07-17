const express = require('express')
const serverless = require('serverless-http')
const app = express()
const routerFunc = require('../router')

// Router so we can use netlify
const router = express.Router()

// Setup lambda function
app.use(bodyParser.json())
// path must route to lambda
app.use('/.netlify/functions/server', routerFunc(router, express)) 

module.exports = app
module.exports.handler = serverless(app)
