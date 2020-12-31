module.exports = {
    name: 'test',
    description: "this is a test command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client){
        const channelid = message.channel.id.get()
        message.channel.send(`Running \nlocaltime: ${Date}\nChannel: ${channelid}`)
    }
}