const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true
};

const CookieAmount = mongoose.Schema({
    userID: reqString,
    cookies: reqString
});

module.exports = mongoose.model('cookiesSchema', CookieAmount);