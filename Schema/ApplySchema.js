const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true
};

const ApplySchema = mongoose.Schema({
    userID: reqString,
    _id: reqString,
    answers: [reqString]
});

module.exports = mongoose.model('applications', ApplySchema);