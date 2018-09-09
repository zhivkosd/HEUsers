const mongoose = require('mongoose');
const collection = require('../../config/db').collections.users;
let sanitiser = require('../helpers/sanitise_inputs');
let Schema = new mongoose.Schema({
    email: {type: String, 
        lowercase: true, 
        validate: sanitiser.email,
        unique: true,
        required: true
    },
    givenName: String,
    familyName: String,
    created: Date
}, {collection: collection});

module.exports = mongoose.model('Users', Schema);
