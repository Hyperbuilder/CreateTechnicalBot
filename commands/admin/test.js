module.exports = {
    name: 'test',
    description: "this is an uptime command!",
    expArgs: "<none>",
    help: "Command to get node process data",
    permission: "ADMINISTRATOR",
    execute(client, message, args, Discord) {
        const prettyMilliseconds = require("pretty-ms");
        message.channel.send(`Uptime: ${prettyMilliseconds(process.uptime() * 1000)}`)
    }
}