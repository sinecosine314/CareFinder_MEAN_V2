/**
 * users-controller - Users controller
 * @type {*|Mongoose}
 */

const mongoose = require('mongoose')
const Users = require('../models/user-model')
const config = require('../helpers/config-helper')
const error = require('../helpers/error-helper')

/**
 * create - Create a new user
 *
 * This method creates a new user object using the data from the request
 * body and the users model.  The new object is saved in the database.  The
 * corresponding _id is returned to the user in the location header along with
 * the newly created object.  Note that the salt and the hash used for the
 * password are not returned in the object.
 *
 * Note (1): the middleware will validate that the required fields are present
 * as well as replace the password field with a salt field and a hash field.
 *
 * Note (2): The salt and hash should not be returned as part of the returned
 * data.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.create = async (req, res) => {
  // const newuser = new Users(req.body)
  // await newuser.save()
  // // For some reason, this does not work...?
  // // delete newuser.salt
  // // delete newuser.hash
  // newuser.salt = undefined
  // newuser.hash = undefined
  newuser = await getAndSaveNewUser(req.body)
  res.location(newuser._id)
  res.status(config.http.status.created).json({ data: newuser })
}

/**
 * read - Return user(s)
 *
 * The method builds a query search object from the parameters of the query
 * string.  The object is passed to the Mongoose .find() method and the query
 * is executed.  The result is sent back to the user.
 *
 * Some of the parameters are handled differently. If the user sends in an id,
 * a username or a email, a single result is returned if found. The other
 * parameters are stacked to produce multiple possible results.  In this case
 * an array is returned.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.read = async (req, res) => {
    // searchObj is a JSON object that contains the search criteria
    let searchObj = {}

    let users

    // Read by Id. Id's are unique so only return a singular
    if (req.query.id) {
      // The ObjectId types is expected in the mongoose query
      // Todo: why is this unresolved?
      if(mongoose.Types.ObjectId.isValid(req.query.id)) {
        users = await Users.findById(req.query.id, (err, result) => {
          if (!result)
            res.status(config.http.status.not_found)
        }).select("-salt -hash")
      }
      else {
        res.status(config.http.status.not_found)
      }
    }
    // Read by username. Username's are unique so only return a singular
    else if (req.query.username) {
      searchObj.username = req.query.username
      // users = await Users.findOne(searchObj).select("-salt -hash")
      users = await Users.findOne(searchObj, (err, result) => {
        if (!result)
          res.status(config.http.status.not_found)
      }).select("-salt -hash")
    }
    else if (req.query.email) {
      // email's are unique so only return a singular
      searchObj.email = req.query.email
      users = await Users.findOne(searchObj, (err, result) => {
        if (!result)
          res.status(config.http.status.not_found)
      }).select("-salt -hash")
    }
    else {
      // These are not unique; multiple records could exist. The results
      // are returned as an array.
      if (req.query.role)
        searchObj.role = req.query.role
      if (req.query.firstname)
        searchObj.firstname = req.query.firstname
      if (req.query.lastname)
        searchObj.lastname = req.query.lastname
      users = await Users.find(searchObj, (err, result) => {
        if (result.length === 0)
          res.status(config.http.status.not_found)
      }).select("-salt -hash")
    }

    if (users)
      res.json({ data: users })
    else
      res.json({ data: {} })
}

/**
 * replace - replace/create a user
 *
 * This method replaces a user given the query parameter. Allowed parameters
 * are by id, username or email. If the user is not found, a new users is
 * created. (1) If an id field exists in the request body, the given id is
 * used to create the new user (2).
 *
 * Middleware applied pre controller:
 *   userFieldsRequired
 *   queryRequired
 *
 * (1) I could not get findOneAndReplace() to work "properly". The issue is
 * that findOneAndReplace() does exactly what it says it does: it finds a doc
 * and replaces it with the supplied doc - it does not maintain the timestamps
 * even when using the { timestamps: true/false } option. I do not know if
 * this is a bug or not. I tried every possible combination (see below) but
 * could not come up with something that maintained the timestamps. So, the
 * code does the process "by hand": it uses findOne, creates a new doc and
 * saves it via .save()
 *
 * A query parameter is required; replacing/creating the entire collection is
 * not supported.
 *
 * Note 1: the middleware will validate that the required fields are present
 * as well as replace the password field with a salt field and a hash field.
 *
 * Note 2: Thr standard says that we are supposed to honor an id sent in from
 * the user when creating a new user with PUT. Unfortunately, this is not
 * possible as MongoDb has strict "formatting" rules for ids inside the
 * database. If an id is sent, it is checked to confirm that is is an
 * acceptable MongoDb _id.  If it is, is will be used per the standard. If it
 * is not, a 400 status is returned.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 *
 * Tried:
 *   const options = { new: true, upsert: true, timestamps: false }
 *   const options = { new: true, upsert: true }
 *
 *   const newuser = new Users(req.body)
 *   userdata = await Users.findOneAndReplace({ _id: req.query.id }, { $set: req.body }, options, (err, result) => {
 *   userdata = await Users.findOneAndReplace({ _id: req.query.id }, req.body, options, (err, result) => {
 *   userdata = await Users.findOneAndReplace({ _id: req.query.id }, newuser, options, (err, result) => {
 */
exports.replace = async (req, res) => {
  let myId = null

  // If we have a query string, we are replacing; if not, we are creating
  if (Object.keys(req.query).length > 0) {
    // Replace by id
    if (req.query.id) {
      // The ObjectId type is expected in the mongoose query
      // Todo: why is this unresolved?
      if (mongoose.Types.ObjectId.isValid(req.query.id)) {
        await Users.findByIdAndRemove(req.query.id, (err, result) => {
          if (result)
            myId = result._id
        })
      } else {
        const thiserr = error.getError(config.http.status.bad_request, config.messages.error.system.unacceptable_id)
        res.status(config.http.status.bad_request).json({ error: thiserr })
      }
    }
    // Update by username
    else if (req.query.username) {
      await Users.findOneAndRemove({ username: req.query.username }, (err, result) => {
        if (result)
          myId = result._id
      })
    }
    // Update by email
    else if (req.query.email) {
      await Users.findOneAndRemove({ email: req.query.email }, (err, result) => {
        if (result)
          myId = result._id
      })
    }
    // Unsupported option
    else {
      const thiserr = error.getError(config.http.status.internal_server_error, config.messages.error.system.unsupported_update_option)
      res.status(config.http.status.internal_server_error).json({ error: thiserr })
    }
  }

  // Check the format of the id
  if (req.body.id) {
    if (mongoose.Types.ObjectId.isValid(req.body.id)) {
      myId = req.body.id
    }
    else {
        const thiserr = error.getError(config.http.status.bad_request, config.messages.error.system.unacceptable_id)
        res.status(config.http.status.bad_request).json({ error: thiserr })
    }
  }

  const userdata = await getAndSaveNewUser(req.body, myId)

  if (userdata)
    res.json({ data: userdata })
  else
    res.json({ data: {} })
}

/**
 * patch - patch a user
 *
 * Options:
 *   new: true - return the newly created document, not the old one.
 *   upsert: false - do not create the new document if it does not exist.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.patch = async (req, res) => {
  const options = { new: true, upsert: false }
  let userdata

  // Update by id
  if (req.query.id) {
    // The ObjectId type is expected in the mongoose query
    // Todo: why is this unresolved?
    if(mongoose.Types.ObjectId.isValid(req.query.id)) {
      userdata = await Users.findByIdAndUpdate(req.query.id, req.body, options, (err, result) => {
        if (!result)
          res.status(config.http.status.not_found)
      }).select("-salt -hash")
    }
    else {
      res.status(config.http.status.not_found)
    }
  }
  // Update by username
  else if (req.query.username) {
    userdata = await Users.findOneAndUpdate(req.query.username, req.body, options, (err, result) => {
      if (!result)
        res.status(config.http.status.not_found)
    }).select("-salt -hash")
  }
  // Update by email
  else if (req.query.email) {
    userdata = await Users.findOneAndUpdate(req.query.email, req.body, options, (err, result) => {
      if (!result)
        res.status(config.http.status.not_found)
    }).select("-salt -hash")
  }
  // Unsupported option
  else {
    const thiserr = error.getError(config.http.status.internal_server_error, config.messages.error.system.unsupported_update_option)
    res.status(config.http.status.internal_server_error).json({ error: thiserr })
  }

  //await Users.findByIdAndUpdate(req.query.id, req.body, options).exec()
  //const userdata = await Users.findById(req.query.id).exec()
  res.json({ data: userdata })
}

/**
 * delete - Delete a single user given its id, username or
 * email
 */
exports.delete = async (req, res) => {
  if (req.query.id)
    await Users.findByIdAndRemove(req.query.id).exec()
  if (req.query.username)
    await Users.findOneAndRemove(req.query.username).exec()
  if (req.query.email)
    await Users.findOneAndRemove(req.query.email).exec()
  res.status(204).send()
}

/**
 * getAndSaveNewUser - The name says it all...
 *
 * @param data
 * @returns {Promise<*>}
 */
//async function getAndSaveNewUser(data, optionalId) {
getAndSaveNewUser = async (data, optionalId) => {
  const userdata = new Users(data)
  if (optionalId)
    userdata._id = optionalId
  await userdata.save()
  userdata.salt = undefined
  userdata.hash = undefined
  return userdata
}

async function modifyUser (request) {

}