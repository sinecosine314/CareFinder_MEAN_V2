const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/refresh-token-model')

/**
 * getNewAccessToken - Return a new access token
 * @param user
 * @returns {Promise<undefined|*>}
 */
exports.getNewAccessToken = async (user) => {
  // First arg to sign cannot be a string, hence the { user }.  Must be a
  // regular object per https://github.com/auth0/node-jsonwebtoken/issues/166
  // The 'iat' claim is automatically added to the header.
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESSTOKEN_EXPIRESIN,
    issuer: process.env.JWT_ISSUER
  })

  // Send the token back
  return token
}

/**
 * getNewRefreshToken - get a new refresh token
 * @param user
 * @returns {Promise<{trim: boolean, type: StringConstructor, required: string}|{type: String | StringConstructor, required: boolean}>}
 */
exports.getNewRefreshToken = async (user) => {
  let refreshToken = await RefreshToken.findOne({ username: user.username }).exec()
  if (!refreshToken) {
    refreshToken = new RefreshToken({
      username: user.username,
      refreshToken: jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.REFRESHTOKEN_EXPIRESIN,
        issuer: process.env.JWT_ISSUER
      })
    })
    //refreshToken.save()
  }
  return refreshToken.refreshToken
}

/**
 * getEpochTimeFromToken - use epoch time from the token instead of generating it ourselves
 * @param token
 * @returns {Promise<*>}
 */
exports.getEpochTimeFromToken = async (token) => {
  const { exp } = jwt.verify(token, process.env.JWT_SECRET)
  return exp
}

/**
 * verifyToken - verify a token
 *
 * This method uses the JsonWebToken verify() method to verify a token. The
 * verify() method returns the JWT payload upon success and throws an
 * exception in a number of circumstances, including token expiration. Thus,
 * th user of tis method should use a try/catch to catch the exception thrown
 * by verify().
 *
 * @param token - the token to be verified
 * @returns {Promise<*>}
 */
exports.verifyToken = async (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET)
  return user
}
