const express = require('express')
const serverless = require('serverless-http')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const newRouter = require('./router')

// Router so we can use netlify
const router = express.Router()

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(`<script>top.location.href = "/${snapshots.slice(-1)}"</script>`)
  res.end()
})

// Setup lambda function
app.use(bodyParser.json())
app.use('/.netlify/functions/server', newRouter) // path must route to lambda

module.exports = app
module.exports.handler = serverless(app)
