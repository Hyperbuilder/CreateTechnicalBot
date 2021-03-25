module.exports = {
    name: 'test',
    description: "this is a test command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {
        const config = require("../config.json")
        const date = new Date();
        const uptime = Math.floor((Math.floor(process.uptime()) / 60) / 60)
        message.channel.send(`Running \nlocaltime: ${date}\nUptime: ${uptime}`)
        message.channel.send(`Stored Server IP: ${config.IP}`)
    }
}