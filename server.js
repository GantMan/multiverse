const express = require('express')
const app = express()
const serverless = require('serverless-http')

let router = require('./express/server')

// Setup lambda function
app.use(bodyParser.json())
app.use('/.netlify/functions/server', router) // path must route to lambda
app.handler = serverless(app)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Netlify app listening on port ${port}!`))
