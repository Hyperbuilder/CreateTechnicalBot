const mongo = require('./mongo');
const ApplySchema = require('./Schema/ApplySchema')

module.exports = (client) => { }

module.exports.addApp = async (userID, applycode) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running: Findone()')

            let _id = applycode

            const result = await ApplySchema.findOne({
                userID,
                _id
            });

            if (result) {
                console.log(`${result}, Already exists`)
            } else {
                console.log(`Inserting Document: ${userID}, ${applycode}`)
                await new ApplySchema({
                    userID,
                    _id
                }).save()
            }

            console.log('Result:', result);

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.denyApp = async (applycode) => {
    return await mongo().then(async (mongoose) => {
        try {
            let _id = applycode;

            console.log(`Running: Findone(Applycode/Id: ${_id})`)

            const result = await ApplySchema.findOne({ _id: _id }).catch((error) => {
                console.log(`Error occured while running findOne(), Error: ${error}`)
            })

            let userID = null;
            if (result) {

                console.log(`result: ${result}, UserID: ${userID}`)

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
            let _id = applycode;

            console.log(`Running: Findone(Applycode/Id: ${_id})`)

            const result = await ApplySchema.findOne({ _id: _id }).catch((error) => {
                console.log(`Error occured while running findOne(), Error: ${error}`)
            })

            let userID = null;
            if (result) {

                console.log(`result: ${result}, UserID: ${userID}`)

                return userID = result.userID;
            } else {
                console.log("No result recieved")
            }

        } finally {
            mongoose.connection.close()
        }
    })
}