/**
 * config-helper.js - Application configuration helper
 *
 * Copyright notice at the end of the file.
 *
 * @type {{}}
 */

let config = {}

config.db = {}
config.http = {}
config.http.status = {}
config.messages = {}
config.messages.error = {}
config.messages.error.auth = {}
config.messages.error.db = {}
config.messages.error.http = {}
config.messages.error.router = {}
config.messages.error.system = {}
config.messages.error.token = {}
config.models = {}
config.models.consts = {}

// Database
config.db.connection_string = process.env.MONGO_URL
config.db.connection_options = { useNewUrlParser: true, useUnifiedTopology: true }

// Error messages
config.messages.error.nomessage = ""

config.messages.error.auth.wrong_password = "The given password was incorrect."

config.messages.error.db.hospital_creation = "There was a problem creating the hospital in the database: "
config.messages.error.db.hospital_notfound = "The requested hospital was not found in the database."
config.messages.error.db.hospital_update = "There was a problem updating the hospital in the database: "
config.messages.error.db.missing_providerId = "Missing the required 'providerId' field."
config.messages.error.db.missing_username = "Missing the required 'username' field."
config.messages.error.db.missing_password = "Missing the required 'password' field."
config.messages.error.db.missing_email = "Missing the required 'email' field."
config.messages.error.db.missing_role = "Missing the required 'role' field."
config.messages.error.db.missing_token = "Missing the required 'token' field."
config.messages.error.db.user_not_found = "No such user exists."
config.messages.error.db.validation_error = "Validation error."

config.messages.error.http.user_missing = "User missing from request."
config.messages.error.http.method_not_allowed = "This method is not allowed. a query parameter is required."
config.messages.error.http.missing_query_string = "A required query string is missing."

config.messages.error.router.invalid_route = "Invalid route."

config.messages.error.system.internal_server_error = "Internal system error."
config.messages.error.system.unsupported_update_option = "Unsupported update option."
config.messages.error.system.unacceptable_id = "The supplied ID is not acceptable."

config.messages.error.token.no_access_token_gen = "Access token not generated."
config.messages.error.token.no_refresh_token_gen = "Refresh token not generated."
config.messages.error.token.missing_exp_date = "Missing expiration date in token."
config.messages.error.token.missing_refresh_parm = "Missing refresh token parameter."
config.messages.error.token.malformed_value = "Malformed token value."
config.messages.error.token.does_not_exist = "No such token exists."
config.messages.error.token.expired = "Token is expired."
config.messages.error.token.revoked = "Token is revoked."
config.messages.error.token.invalid = "Token is invalid."
config.messages.error.token.mismatch = "Token mismatch."

// Models
config.models.hospitals = 'Hospital'
//config.models.keys = 'ApiKey'
config.models.users = 'Users'
config.models.refreshToken = 'RefreshToken'
config.models.consts.random_bytes = 16
config.models.consts.numbering_system = 'hex'
config.models.consts.iterations = 100000
config.models.consts.keylen = 512
config.models.consts.digest = 'sha512'
config.models.consts.algorithms = ['HS256']

// HTTP
config.http.status.ok = 200
config.http.status.created = 201
config.http.status.no_content = 204
config.http.status.bad_request = 400
config.http.status.unauthorized = 401
config.http.status.forbidden = 403
config.http.status.not_found = 404
config.http.status.method_not_allowed = 405
config.http.status.internal_server_error = 500

module.exports = config

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