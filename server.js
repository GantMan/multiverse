const express = require('express')
const path = require('path')
const app = express()

// list of stable snapshots
const snapshots = ['snap1', 'snap2', 'snap3', 'snap4']

// Make latest build accessible like staging
app.use('/latest/', express.static(path.join(__dirname, 'build')))
app.get('/latest/*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
)

// setup each snapshot build folder
snapshots.map(snapshotName => {
  app.use(
    `/${snapshotName}/`,
    express.static(path.join(__dirname, snapshotName))
  )
  app.get(`/${snapshotName}/*`, (_req, res) =>
    res.sendFile(path.join(__dirname, snapshotName, 'index.html'))
  )
})

// default to latest stable
app.get('/', (_req, res) => res.redirect(`/${snapshots.slice(-1)}`))

app.listen(process.env.PORT || 8080)
console.log('live')
