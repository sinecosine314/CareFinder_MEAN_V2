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
config.messages.error.db = {}
config.messages.error.router = {}
config.messages.error.system = {}
config.models = {}

// Database
config.db.connection_string = 'mongodb://127.0.0.1:27017/carefinder'
config.db.connection_options = { useNewUrlParser: true, useUnifiedTopology: true }

// Error messages
config.messages.error.nomessage = "";
config.messages.error.db.hospital_creation = "There was a problem creating the hospital in the database: ";
config.messages.error.db.hospital_notfound = "The requested hospital was not found in the database.";
config.messages.error.db.hospital_update = "There was a problem updating the hospital in the database: ";
config.messages.error.db.missing_apikey = "Missing the required 'apikey' field.";
config.messages.error.db.missing_email = "Missing the required 'email' field.";
config.messages.error.db.missing_firstName = "Missing the required 'firstName' field.";
config.messages.error.db.missing_id = "Missing the required 'id' parameter.";
config.messages.error.db.missing_lastName = "Missing the required 'lastName' field.";
config.messages.error.db.missing_password = "Missing the required 'password' field.";
config.messages.error.db.missing_providerId = "Missing the required 'providerId' field.";
config.messages.error.db.missing_username = "Missing the required 'username' field.";
config.messages.error.db.validation_error = "Validation error.";

config.messages.error.router.invalid_route = "Invalid route.";

config.messages.error.system.internal_server_error = "Internal system error.";

// Models
config.models.hospitals = 'Hospital';
config.models.keys = 'ApiKey';
config.models.users = 'Users';

// HTTP
config.http.status.ok = 200;
config.http.status.created = 201;
config.http.status.no_content = 204;
config.http.status.bad_request = 400;
config.http.status.forbidden = 403;
config.http.status.not_found = 404;
config.http.status.internal_server_error = 500;

module.exports = config;

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