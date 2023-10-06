/**
 * replace-conditions - ensure the conditions hold for a replace (PUT)
 *
 * If a query string exists, we are replacing so an id in the body should be
 * removed if it exists.
 *
 * If we do not have a query string, we are creating so an id in the body may
 * exist.  If it is there, we need to use it but it needs to be in the correct
 * "format".
 *
 * @type {{}}
 */
const mongoose = require('mongoose')
const config = require('../helpers/config-helper')
const err = require('../helpers/error-helper')

module.exports = async (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    // We have a query string; check for an id in the request body
    if (req.body.id)
      delete req.body.id
  }
  else {
    // No query string; check for a valid id
    if (req.body.id) {
      if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
        return next(err.getError(config.http.status.bad_request, config.messages.error.system.unacceptable_id))
      }
    }
  }
  return next()
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