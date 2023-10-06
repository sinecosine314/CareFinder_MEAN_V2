/**
 * usersRoutes.js - The users router
 *
 * Copyright notice at the end of the file.
 *
 * This file is the router file for the users.  It routes URI endpoints to
 * controller functions.  The routes support CRUD architecture.
 */

const express = require('express')

const usersController = require('../controllers/users-controller')
const userFieldsRequired = require('../middleware/user-fields-required')
const replaceConditions = require('../middleware/replace-conditions')
const { catchErrors } = require('../middleware/error-handlers')

const router = express.Router();

// CRUD Controller for the Users(s)
// --------------------------------

// Remember that here, the '/' is relative to the '/users'
// route defined in api-routes.js as "router.use('/users', usersRoutes)"

// (C)reate a new user with given information
// POST /users
// Example: POST http://localhost:3000/users
router.post('/', userFieldsRequired, catchErrors(usersController.create))

// (R)ead user(s) in various ways
// GET /users?<list of query parameters>
// Example: GET http://localhost:3000/users?firstname=john
router.get('/', catchErrors(usersController.read))

// (U)pdate/create a specific user with given information
// PUT /users?<list of query parameters>
// Example: PUT http://localhost:3000/users?id=5fad777c032b26732e40b3e7
router.put('/', userFieldsRequired, replaceConditions, catchErrors(usersController.replace))

// (U)pdate/Patch a user with given information
// PATCH /users?id=:id
// Example: PATCH http://localhost:3000/users?id=5fad777c032b26732e40b3e7
router.patch ( '/', catchErrors(usersController.modify))

// (D)elete a user by its id
// DELETE /users?id=:id
// Example: DELETE http://localhost:3000/users?id=5fad777c032b26732e40b3e7
router.delete('/', catchErrors(usersController.delete))

module.exports = router;

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