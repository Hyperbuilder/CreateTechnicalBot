const mongo = require("@root/mongo")



module.exports = async (Discord, client) => {
    console.log(`=========================`);
    console.log('CT Test + Gamble bot is running')

    await mongo().then(mongoose => {
        try {
            console.log(`Connected to MongoDB`)
        } finally {
            mongoose.connection.close()
        }
    })

    client.user.setActivity("Create Technical Discord", { type: 'WATCHING' })
}