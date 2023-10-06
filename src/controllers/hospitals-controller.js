/**
 * hospital-controller - API hospitals controller
 *
 * Copyright notice at the end of the file.
 *
 * Note: By the time we get here, it will have already been determined whether
 * the API key is present in the request or not via the apikey-required
 * middleware.  Thus, if we get here, the API key is present and it is safe to
 * perform any of the methods.
 *
 * @type {*|Mongoose}
 */

const config = require('../helpers/config-helper')
const Hospitals = require('../models/hospital-model')

/**
 * read - Return a list of hospitals
 *
 * The method builds a query search object from the parameters of the query
 * string.  The object is passed to the Mongoose .find() method and the query
 * is executed.  The result is sent back to the user.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.read = async (req, res) => {
  // searchObj is a JSON object that contains the search criteria
  let searchObj = {}

  // Check each possible parameter
  if (req.query.providerId)
    searchObj.providerId = req.query.providerId
  if (req.query.name)
    searchObj.name = req.query.name
  if (req.query.city)
    searchObj.city = req.query.city
  if (req.query.state)
    searchObj.state = req.query.state
  if (req.query.zipCode)
    searchObj.zipCode = req.query.zipCode
  if (req.query.county)
    searchObj.county = req.query.county

  // Query the database
  const hospitals = await Hospitals.find(searchObj).exec()
  res.json({ data: hospitals })
}

/**
 * create - Create a new resource and save it in the database
 *
 * This method creates a new hospital object using the data from the request
 * body and the hospital model.  The new object is saved in the database.  The
 * corresponding _id is returned to the user in the location header along with
 * the newly created object.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.create = async (req, res) => {
  const hospital = new Hospitals(req.body)
  await hospital.save()
  res.location(hospital._id)
  res.status(config.http.status.created).json({ data: hospital })
}

/**
 * patch - Apply a partial modification to a Hospital resource.
 *
 * @option new True to return the modified document rather than the original. Defaults to false
 * @option upsert True to create the object if it does not exist. Defaults to false.
 * @option setDefaultsOnInsert If this and upsert are true, mongoose will apply the defaults specified in the model's
 * schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's
 * $setOnInsert operator.
 *
 * @param req
 * @param res
 *
 * @returns {Promise<void>}
 */
exports.patch = async (req, res) => {
  const options = { new: true, upsert: true, setDefaultsOnInsert: true }
  const hospital = await Hospitals.findByIdAndUpdate(req.params.id, req.body, options).exec()
  res.status(config.http.status.ok).json({ data: hospital })
}

/**
 * update - Create a new resource or replace a representation of the target resource with the request payload
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
  const hospital = await Hospitals.findById(req.params.id).exec()
  if (hospital) {
    // If the user did not provide a providerID, add it
    if (!req.body.providerId)
      req.body.providerId = hospital.providerId
    // Overwrite/replace the existing document
    await hospital.overwrite(req.body)
    await hospital.save()
    res.status(config.http.status.ok).json({ data: hospital })
  } else {
    // Create a new document by "redirecting" to store()
    this.store(req, res)
  }
}

/**
 * destroy - Destroy/delete a single record given its id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
  await Hospitals.findByIdAndDelete(req.params.id).exec()
  res.status(config.http.status.no_content).send()
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