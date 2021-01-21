module.exports = {
    name: 'pong',
    description: "this is a pong command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client){
        message.channel.send('Ping! \nWai... Wait...You stole my job D:')
    }
}