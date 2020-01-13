/**
 * error-handlers.js - Handle application errors.
 *
 * Copyright notice is at the end of the file.
 *
 * Some of the code in this file comes from:
 * https://github.com/wesbos/Learn-Node/blob/master/stepped-solutions/45%20-%20Finished%20App/handlers/errorHandlers.js
 *
 * @type {{}}
 */

const config = require('../helpers/config-helper')
const error = require('../helpers/error-helper')

/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 */
exports.catchErrors = (action) => {
  return (req, res, next) => {
    action(req, res).catch(next)
  }
}

/**
 * Handle any invalid routes.
 */
exports.invalidRoute = (req, res, next) => {
  const thiserr = error.getError(config.http.status.not_found, config.messages.error.router)
  //const err = new Error(config.messages.error.router)
  //err.status = config.http.status.not_found
  next(thiserr)
}

/**
 * Validation error handler for Mongo.
 * The client app should handle displaying the errors.
 */
exports.validationErrors = (err, req, res, next) => {
  if (!err.errors) {
    return next(err)
  }
  const thiserr = error.getError(config.http.status.bad_request, config.messages.error.db.validation_error)
  thiserr.error = err.errors
  thiserr.data = {}
  res.json(thiserr)
}

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