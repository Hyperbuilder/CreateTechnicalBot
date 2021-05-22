const mongo = require("../../mongo")
const cookiesSchema = require("../../Schema/cookieSchema")

module.exports.addCookies = async (userID, cookies) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running: Findone()')

            const result = await cookiesSchema.findOneAndUpdate({
                userID
            }, {
                userID,
                $inc: {
                    cookies: cookies
                }
            }, {
                new: true,
                upsert: true
            });
        } finally {
            mongoose.connection.close()
        }
    })
}
