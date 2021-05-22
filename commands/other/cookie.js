const mongo = require("../../mongo")
const cookiesSchema = require("../../Schema/cookieSchema")

module.exports = {
    name: "cookie",
    description: "Give cookies",
    async execute(client, message, args) {
        await mongo().then(async (mongoose) => {
            try {
                console.log('Running: Findone()')

                const result = await cookiesSchema.findOneAndUpdate({
                    userID
                });

                let cookies = 1

                if (result) {
                    console.log(`${result}, Already exists`)
                } else {
                    await new cookiesSchema({
                        userID,
                        cookies
                    }).save()
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}