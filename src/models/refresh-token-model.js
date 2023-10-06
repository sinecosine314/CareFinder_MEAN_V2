const mongoose = require('mongoose')
const config = require('../helpers/config-helper')

const definition = {
  refreshToken: { type: String, trim: true, required: config.messages.error.db.missing_token },
  username: { type: String, trim: true, required: config.messages.error.db.missing_username }
}

const options = {
  timestamps: true
}

const schema = new mongoose.Schema(definition, options)

module.exports = mongoose.model(config.models.refreshToken, schema)
