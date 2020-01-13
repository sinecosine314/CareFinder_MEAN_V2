/**
 * hospitalsRoutes.js - The hospitals router
 *
 * Copyright notice at the end of the file.
 *
 * This file is the router file for the hospitals.  It routes URI endpoints to
 * controller functions.  The routes support CRUD architecture.
 */

const express = require ( 'express' );

const hospitalsController = require( '../controllers/hospitals-controller' );
const providerIdRequired = require('../middleware/providerId-required')
const { catchErrors } = require('../middleware/error-handlers')

const router = express.Router();

// CRUD Controller for the Hospital(s)
// -----------------------------------

// Remember that here, the '/' is relative to the '/hospitals'
// route defined in server.js as "app.use('/hospitals', hospitals);"

// todo: should be an admin-only route
// (C)reate a new hospital with given information
// POST /hospitals
// Example: POST http://localhost:3000/hospitals
//router.post('/', catchErrors(hospitalsController.store), apikeyRequired)
router.post('/', providerIdRequired, catchErrors(hospitalsController.store))

// (R)ead a hospital(s) in various ways
// GET /hospitals?<list of query parameters>
// Example: GET http://localhost:3000/hospitals?city=CHICAGO
router.get('/', catchErrors(hospitalsController.index))

// (R)ead a specific hospital
// GET /hospitals/{hospitalId}
// Example: GET http://localhost:3000/hospitals/5e10bda58d57e80faa871867
router.get('/:id', catchErrors(hospitalsController.show))

// todo: should be an admin-only route
// (U)pdate/create a specific hospital with given information
// PUT /hospitals/{hospitalId}
// Example: POST http://localhost:3000/hospitals/5e10bda58d57e80faa871867
router.put('/:id', providerIdRequired, catchErrors(hospitalsController.update))

// todo: should be an admin-only route
// (U)pdate-Patch a hospital with given information
// PATCH /hospitals/{hospitalid}
router.patch ( '/:id', catchErrors(hospitalsController.patch))

// todo: should be an admin-only route
// (D)elete a hospital by its hospitalid
// Example: DELETE http://localhost:3000/hospitals?id=5e0a9e3245a13ed2ba4e8d4d
router.delete('/:id', catchErrors(hospitalsController.destroy))

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