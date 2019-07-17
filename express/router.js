const express = require('express')
const path = require('path')

// list of stable snapshots
const snapshots = ['snap1', 'snap2', 'snap3', 'snap4']

// Router so we can use netlify
const router = express.Router()

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

router.get('/', (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(`<script>top.location.href = "/${snapshots.slice(-1)}"</script>`)
  res.end()
})

module.exports = router
