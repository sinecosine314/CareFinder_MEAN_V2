const mongoose = require('mongoose')
const config = require('../helpers/config-helper')

const schemaDefinition = {
    'username': {
        type: String,
        lowercase: true,
        required: [true, config.messages.error.db.missing_username],
        match: [/^[a-zA-Z0-9]+$/, config.messages.error.db.validation_error],
        index: true,
        unique: true,
        trim: true
    },
    'email': {
        type: String,
        lowercase: true,
        required: [true, config.messages.error.db.missing_email],
        match: [/\S+@\S+\.\S+/, config.messages.error.db.validation_error],
        index: true,
        unique: true,
        trim: true
    },
    'role': {
        type: String,
        enum: ['admin', 'user', 'guest'],
        required: [true, config.messages.error.db.missing_role],
        trim: true
    },
    'firstname': { type: String, trim: true },
    'lastname': { type: String, trim: true },
    'salt': { type: String, trim: true },
    'hash': { type: String, trim: true }
}

const options = {
    timestamps: true
}

const userSchema = new mongoose.Schema(schemaDefinition, options)

// Export the schema
module.exports = mongoose.model(config.models.users, userSchema)
