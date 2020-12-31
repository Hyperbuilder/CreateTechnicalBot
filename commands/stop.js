module.exports = {
    name: 'stop',
    description: "this is a stop command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, BotOwner) {
        if (!BotOwner) {
            message.channel.send('https://tenor.com/8pOE.gif')
        } else {
            message.channel.send('Shutting down...').then(m => {
                client.destroy();
            });
        }
    }
}
