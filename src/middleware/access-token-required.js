/**
 * access-token-required.js - Middleware to ensure a valid access token is provided
 *
 * Copyright notice at the end of the file.
 *
 * @type {{}}
 */
const config = require('../helpers/config-helper')
const err = require('../helpers/error-helper')
const token = require('../helpers/token-helper')

module.exports = async (req, res, next) => {
  // The token is in the Authorization header
  const ah = req.headers.authorization

  // Extract the token
  const jwt = ah.split(' ')[1];

  // Verify the token
  let payload
  try {
    payload = await token.verifyToken(jwt)
  }
  catch (e) {
    if (e.name === "TokenExpiredError")
      return next(err.getError(config.http.status.forbidden, config.messages.error.token.expired))
  }

  if (!payload.user)
    return next(err.getError(config.http.status.unauthorized, config.messages.error.token.invalid))

  // Put the user object in the req object to be use by the route
  req.user = payload.user
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