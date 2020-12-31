module.exports = {
    name: 'test',
    description: "this is a test command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client){
        const date = new Date();
        message.channel.send(`Running \nlocaltime: ${date}`)
    }
}