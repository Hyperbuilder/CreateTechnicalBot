const mongo = require('./mongo');
const ApplySchema = require('./Schema/ApplySchema')

module.exports = (client) => { }

module.exports.addApp = async (userID, applycode, answers) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running: Findone()')

            let _id = applycode

            const result = await ApplySchema.findOne({
                userID,
                _id
            });

            let status = false;

            if (result) {
                console.log(`${result}, Already exists`)
            } else {
                console.log(`Inserting Document: ${userID}, ${applycode}`)
                await new ApplySchema({
                    userID,
                    _id,
                    answers,
                    status
                }).save()
            }

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.denyApp = async (applycode) => {
    return await mongo().then(async (mongoose) => {
        try {
            let _id = applycode;

            console.log(`Running: Findone(${_id})`)

            const result = await ApplySchema.findOne({ _id: _id })

            let userID = null;

            if (result) {
                return userID = result.userID;
            } else {
                console.log("No result recieved")
            }

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.acceptApp = async (applycode) => {
    return await mongo().then(async (mongoose) => {
        try {

            console.log(`Running: Findone(${applycode})`)

            const filter = { _id: applycode }
            const result = await ApplySchema.findOne(filter)

            let userID = null;
            if (result) {
                return userID = result.userID;
            } else {
                console.log("No result recieved")
            }

        } finally {
            mongoose.connection.close()
        }
    })
}