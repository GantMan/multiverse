const express = require('express')
const serverless = require('serverless-http')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

// list of stable snapshots
const snapshots = ['snap1', 'snap2', 'snap3', 'snap4']

// Router so we can use netlify
const router = express.Router()

// Make latest build accessible like staging
router.use('/latest/', express.static(path.join(__dirname, '../', 'build')))
router.get('/latest/*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'build', '../', 'index.html'))
)

// setup each snapshot build folder
snapshots.map(snapshotName => {
    router.use(
    `/${snapshotName}/`,
    express.static(path.join(__dirname, '../', snapshotName))
  )
  router.get(`/${snapshotName}/*`, (_req, res) =>
    res.sendFile(path.join(__dirname, '../', snapshotName, 'index.html'))
  )
})

// default to latest stable
router.get('/', (_req, res) => res.redirect(`'/.netlify/functions/server'/${snapshots.slice(-1)}`))

// Doesn't redirect, just gives proper file
// app.get('/', (_req, res) => res.sendFile(path.join(__dirname, '../', snapshots.slice(-1), 'index.html')))

// Setup lambda function
app.use(bodyParser.json())
app.use('/.netlify/functions/server', router)  // path must route to lambda

module.exports = app
module.exports.handler = serverless(app)
