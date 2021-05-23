const cookiedb = require("../../cookiesdb")

module.exports = {
    name: "cookie",
    description: "Give cookies",
    expArgs: "<none>",
    help: "Get a cookie!",
    permission: "READ_MESSAGE_HISTORY",
    async execute(client, message, args) {
        const cookies = await cookiedb.addCookies(message.user.id, "1")
        message.channel.send(`${message.user} recieved 1 cookie and now has${cookies}`)
    }
}