/**
 * hospital-model.js - The database model for hospitals.
 *
 * Copyright notice at the end of the file.
 *
 * @type {Mongoose}
 */

const mongoose = require('mongoose');
const config = require('../helpers/config-helper');

// Define the hospital schema
const definition = {
  'providerId': { type: String, required: config.messages.error.db.missing_providerId },
  'name': { type: String, trim: true },
  'address': { type: String, trim: true },
  'city': { type: String, trim: true },
  'state': { type: String, trim: true },
  'zipCode': { type: String, trim: true },
  'county': { type: String, trim: true },
  'phoneNumber': { type: String, trim: true },
  'type': { type: String, trim: true },
  'ownership': { type: String, trim: true },
  'emergencyServices': { type: String, trim: true },
  'location': {
    'humanAddress': { type: String, trim: true },
    'latitude': { type: Number },
    'longitude': { type: Number },
    'needsRecoding': { type: String, trim: true }
  }
}

const options = {
  timestamps: true
}

// The schema is useless so far, we need to create a model to use it
const hospitalSchema = new mongoose.Schema(definition, options)

// Make this available to our users in our Node applications
module.exports = mongoose.model(config.models.hospitals, hospitalSchema)

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