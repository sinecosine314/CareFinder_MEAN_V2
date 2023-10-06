/**
 * server.js - The server!
 * @type {*|createApplication}
 */

/* ------------- *\
|* Configuration *|
\* ------------- */

const config = require('./src/helpers/config-helper');

/* ------- *\
|* Express *|
\* ------- */

const express = require('express')

const server = express()

/* -------- *\
 | Mongoose *|
\* -------- */

// The app uses Mongoose as the ODM.
const mongoose = require('mongoose')

// Connect to the database
mongoose.Promise = global.Promise
mongoose.connect(config.db.connection_string, config.db.connection_options)

// Fail on connection error.
mongoose.connection.on('error', error => { throw error })

/* ---- *\
|* CORS *|
\* ---- */

const cors = require('cors')
server.use(cors())

/* ------ *\
|* Helmet *|
\* ------ */

const helmet = require('helmet')

// Protect from some well-known web vulnerabilities by setting HTTP headers appropriately.
server.use(helmet())

/* ---------- *\
|* BodyParser *|
\* ---------- */

const bodyParser = require('body-parser')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

/* ------ *\
|* Routes *|
\* ------ */

const apiRoutes = require('./src/routes/api-routes')

// All the routes are defined in apiRoutes and bound to /api
server.use('/api/' + process.env.API_VERSION + '/', apiRoutes)

/* -------------- *\
|* Error handling *|
\* -------------- */

const errorHandlers = require('./src/middleware/error-handlers')

// Catch all invalid routes
server.use(errorHandlers.invalidRoute)

// Handle mongoose errors
server.use(errorHandlers.validationErrors)

// Replace the default express error handler
server.use(errorHandlers.jsonErrorHandler)

module.exports = server
