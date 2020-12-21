module.exports = {
    name: 'up',
    description: "this is a ping command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client){
        message.channel.send('\*\*NO\*\*')
    }
}