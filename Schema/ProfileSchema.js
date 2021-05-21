const { bold } = require('chalk');
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
    bank: { type: Number },
    xp: reqString,
    level: reqString,
    multiplier: reqString,
})

module.exports = mongoose.model('profiles', ProfileSchema);
