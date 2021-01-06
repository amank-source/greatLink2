const express = require('express')
const path = require('path')
const apiRouter = require('./db-api')
const bodyParser = require('body-parser')
require('dotenv').config()

const { sync } = require('./data_layer/index')

const PORT = process.env.PORT || 3001
const FORCE = process.env.FORCE || false

const app = express()

const morgan = require('morgan')
app.use(morgan('dev'))





app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', apiRouter)


app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'dist', 'index.html'))
})

app.use(function (req, res, next) {
  if (res.status === '404') {
    res.status(404).send("Sorry can't find that!")
  } else if (res.status === '500') {
    res.status(500).send('sorry cant find that')
  }

  next()
})

const startServer = new Promise((resolve) => {
  app.listen(PORT, () => {
    console.log('we are on port', PORT)

    resolve()
  })
})

sync(FORCE)
  .then(startServer)
  .catch((error) => {
    // console.error(`YIKES: ${error.toString()}`)
    console.error(error)
  })