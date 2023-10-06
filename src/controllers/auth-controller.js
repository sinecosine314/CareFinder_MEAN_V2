/**
 * auth-controller.js - The authorization controller
 *
 * @type {module:crypto}
 */

const crypto = require('crypto')

const RefreshToken = require('../models/refresh-token-model')
const Users = require('../models/user-model')

const error = require('../helpers/error-helper')
const token = require('../helpers/token-helper')
const config = require('../helpers/config-helper')

/**
 * login - login to CareFinder
 *
 * Login can be accomplished via "raw" with JSON in the body or via a form
 * with Content-type of application/x-www-form-urlencoded.
 *
 * The login procedure:
 * (1) User sends a username/password combination (see above).
 * (2) The username is searched in the User collection.
 * (3) The password is validated.
 * (4) A new access token is generated.
 * (5) A new refresh token is generated.
 * (6) Th refresh token is saved.
 * (7) The tokens are returned to the user.
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
  const user = req.body

  // Make sure a user was sent
  if (!user)
    throw error.getError(config.http.status.unauthorized, config.messages.error.http.user_missing)

  // See if the user exists
  const thisuser = await Users.findOne({username: user.username}).exec()
  if (!thisuser)
    throw error.getError(config.http.status.unauthorized, config.messages.error.db.user_not_found)

  // Check the user's password
  const checkHash = crypto.pbkdf2Sync(user.password, thisuser.salt, config.models.consts.iterations, config.models.consts.keylen, config.models.consts.digest).toString(config.models.consts.numbering_system)
  if (checkHash !== thisuser.hash)
    throw error.getError(config.http.status.unauthorized, config.messages.error.auth.wrong_password)

  // The token payload will consist of only the username
  const payload = user.username

  // Get a new access token
  const accessToken = await token.getNewAccessToken(payload)
  if (!accessToken)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.no_access_token_gen)

  // Get the expiration date from the new token
  exp = await token.getEpochTimeFromToken(accessToken)
  if (!exp)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.missing_exp_date)

  // Get a new refresh token
  const refreshToken = await token.getNewRefreshToken(payload)
  if (!refreshToken)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.no_refresh_token_gen)

  // Save the refresh token
  const newRT = new RefreshToken
  newRT.username = user.username
  newRT.refreshToken = refreshToken
  newRT.save()

  // All good!
  respond(res, config.http.status.ok, accessToken, exp, refreshToken)
}

/**
 * Refresh an access token.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body

  // Make sure a token was sent
  if (!refreshToken)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.missing_refresh_parm)

  // Verify the token
  let payload
  try {
    payload = await token.verifyToken(refreshToken)
  }
  catch (e) {
    if (e.name === "TokenExpiredError") {
      // If the refresh token is expired, we need to remove it from the db
      await RefreshToken.findOneAndDelete({ refreshToken: refreshToken }).exec()
      throw error.getError(config.http.status.forbidden, config.messages.error.token.expired)
    }
  }
  if (!payload)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.malformed_value)

  // Look up the refresh token
  const dbRefreshToken = await RefreshToken.findOne({ refreshToken: refreshToken }).exec()
  if (!dbRefreshToken)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.does_not_exist)

  // Usernames should match (tokens already match due to findOne()
  if (!payload.username === dbRefreshToken.username)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.mismatch)

  // Ensure the user is registered
  const user = await Users.findOne({username: payload.username}).exec()
  if (!user)
    throw error.getError(config.http.status.unauthorized, config.messages.error.db.user_not_found)

  // Get a new access token
  const accessToken = await token.getNewAccessToken(payload.username)
  if (!accessToken)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.no_access_token_gen)

  // Get the expiration date from the new token
  const exp = await token.getEpochTimeFromToken(accessToken)
  if (!exp)
    throw error.getError(config.http.status.unauthorized, config.messages.error.token.missing_exp_date)

  // All good!
  respond(res, config.http.status.ok, accessToken, exp)
}

/**
 * Local function to construct and send a response.
 * @param res
 * @param status
 * @param at
 * @param exp
 * @param rt
 */
function respond (res, status, at, exp, rt) {
  const returnVal = {
    access_token: at,
    token_type: 'Bearer',
    expires_in: exp,
    refresh_token: rt
  }

  if (typeof rt === 'undefined') { delete returnVal.refresh_token }

  // By convention, the keys are snake case.
  res.status(status).json({data: returnVal})
}
