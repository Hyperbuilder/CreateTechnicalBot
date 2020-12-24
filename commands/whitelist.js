module.exports = {
    name: 'whitelist',
    description: "Me want whitelist",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, message) {
        const channel = client.channels.cache.get(config.whitechannel)
        const author = message.author
        channel.send(`${author} Wants to be whitelisted, Their IGN: ${commandArgs}`)
    }
}