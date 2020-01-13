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
server.use('/api', apiRoutes)

/* -------------- *\
|* Error handling *|
\* -------------- */

const errorHandlers = require('./src/middleware/error-handlers')

// Catch all invalid routes
server.use(errorHandlers.invalidRoute)

// Handle mongoose errors
server.use(errorHandlers.validationErrors)

module.exports = server
