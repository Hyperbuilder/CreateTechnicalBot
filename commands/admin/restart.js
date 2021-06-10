const error = require("@util/error.js")

module.exports = {
    name: 'restart',
    description: "this is a Restart command!",
    expArgs: "<none>",
    help: "Command to restart the node process",
    permission: 'ADMINISTRATOR',
    execute(client, message, args, Discord) {
        const BotOwner = client.users.cache.find(u => u.id === '432217612345278476')
        if (message.author !== BotOwner) {
            message.channel.send('https://tenor.com/8pOE.gif')
        } else {
            error.send("Restarting Bot")
            message.channel.send('Restarting...').then(m => {
                process.exit()
            });
        }
    }
}
