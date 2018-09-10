const mongoose = require('mongoose');
const collection = require('../../config/db').collections.auth;
let sanitiser = require('../helpers/sanitise_inputs');
let authUsersModel = mongoose.model('AuthUsers', new mongoose.Schema({
    username: {type: String,
        unique: true
    },
    password: String
}, {collection: collection}));

function checkHeader(auth) {
    if (auth && sanitiser.exists([auth.username, auth.password])) {
        return true;
    }

    return false;
}

function getCredentials(auth) {
    let buffer = new Buffer(auth.split(' ')[1], 'base64');
    let plainAuth = buffer.toString().split(':');

    return {
        username: plainAuth[0],
        password: plainAuth[1]
    };
}

function encodeToBase64(user, pass) {
    if (user && pass) {
        return btoa(user + ':' + pass);
    }
    return '';
}

function checkAuth(auth) {
    return new Promise((resolve, reject) => {
        if (auth) {
            let credentials = getCredentials(auth);
    
            if (!checkHeader(credentials)) {
                reject('Credentials are missing');
            }
            
            resolve(authUsersModel.where(credentials).countDocuments());
        }
        reject('Credentials are missing');
    });
}

module.exports = {
    check: checkAuth,
    encodeToBase64: encodeToBase64
};