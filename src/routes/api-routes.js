/**
 * api-routes.js - Application routing
 *
 * Copyright notice at the end of the file.
 *
 * @type {createApplication}
 */

const express = require('express')

// Common routes
const hospitalsRoutes = require('./hospitals-routes')
const usersRoutes = require('./users-routes')
const authRoutes = require('./auth-routes')

// Middleware
//const pagination = require('../middleware/pagination')
//const adminOnly = require('../middleware/admin-only')

const router = express.Router()

router.use('/hospitals', hospitalsRoutes)
router.use('/users', usersRoutes)
router.use('/auth', authRoutes)

module.exports = router

/*

CareFinder API.  A RESTful API to deliver V.A. hospital data.  A student project.
Copyright (C) 2020  Timothy H. Knautz

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Contact: knautz@uwp.edu

*/
