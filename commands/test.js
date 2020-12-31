module.exports = {
    name: 'test',
    description: "this is a test command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client){
        message.channel.send(`Running \nlocaltime: ${Date}`)
    }
}