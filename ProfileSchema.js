const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true
}
const ProfileSchema = mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    brass: {
        type: Number,
        require: true,
        default: 1000
    },
    bank: { type: Number }
})

const ApplySchema = mongoose.Schema({
    userID: reqString,
    applycode: Number
})

module.exports = mongoose.model('profiles', ProfileSchema);
module.exports = mongoose.model('applications', ApplySchema);