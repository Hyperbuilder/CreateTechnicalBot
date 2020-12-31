module.exports = {
    name: 'pong',
    description: "this is a pong command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client){
        const channelid = message.channel.id.get()
        message.channel.send(`Running \nlocaltime: ${Date}\nChannel: ${channelid}`)
    }
}