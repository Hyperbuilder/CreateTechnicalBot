module.exports = {
    name: 'stop',
    description: "this is a stop command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config) {
        const BotOwner = message.author.id == config.uid;
        if (!BotOwner) {
            message.channel.send('https://tenor.com/8pOE.gif')
        } else {
            message.channel.send('Shutting down...').then(m => {
                client.destroy();
            });
        }
    }
}
