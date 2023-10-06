/**
 * user-fields-required.js - Middleware to ensure the certain fields of the
 * user are present in the request body
 *
 * Copyright notice at the end of the file.
 *
 * @type {{}}
 */

const config = require('../helpers/config-helper')
const crypto = require('crypto')
const err = require('../helpers/error-helper')

module.exports = async (req, res, next) => {
  if (!req.body.username)
    return next(err.getError(config.http.status.bad_request, config.messages.error.db.missing_username))
  if (!req.body.password)
    return next(err.getError(config.http.status.bad_request, config.messages.error.db.missing_password))
  else
  {
    req.body.salt = crypto.randomBytes(config.models.consts.random_bytes).toString(config.models.consts.numbering_system)
    req.body.hash = crypto.pbkdf2Sync(req.body.password, req.body.salt, config.models.consts.iterations, config.models.consts.keylen, config.models.consts.digest).toString(config.models.consts.numbering_system)
    req.body.password = undefined
  }
  if (!req.body.email)
    return next(err.getError(config.http.status.bad_request, config.messages.error.db.missing_email))
  if (!req.body.role)
    return next(err.getError(config.http.status.bad_request, config.messages.error.db.missing_role))
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