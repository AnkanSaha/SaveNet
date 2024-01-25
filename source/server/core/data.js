// importing require modules
const express = require('express')
const server = express()
const GeneralData = require('./keys/keys')
const os = require('os') // for getting system info
const cluster = require('cluster') // for creating multiple process
const cors = require('cors')
const routing = require('../Router/Router')
const Authentication = require('../Router/AuthRoute')
const DashRoute = require('../Router/ActionRoute.js')

// creating multiple process
let numCPUs = os.cpus().length
if (cluster.isMaster) {
  while (numCPUs > 0) {
    cluster.fork()
    numCPUs--
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  // setting up static folder
  server.use(express.static('./source/static'))
  // setting up body parser
  server.use(
    express.urlencoded({
      extended: true,
      limit: '900mb',
      parameterLimit: 10000000
    })
  )
  server.use(
    express.json({ limit: '900mb', parameterLimit: 10000000, extended: true })
  )
  // setting up cors
  server.use(
    cors({
      origin: GeneralData.CORS_ORIGIN
    })
  )
  // setup router feature for api routes
  server.use(routing)
  server.use(Authentication)
  server.use(DashRoute)
  //  starting server
  server.listen(GeneralData.PORT, () => {
    console.log(`Server is running on port ${GeneralData.PORT}`)
  })

  // view engine setup
  server.set('view engine', 'pug')
  server.set('views', './source/static/html')
}
