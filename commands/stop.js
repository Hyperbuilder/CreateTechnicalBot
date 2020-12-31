module.exports = {
    name: 'stop',
    description: "this is a stop command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, BotOwner) {
        const attachment = new MessageAttachment('https://tenor.com/8pOE.gif');
        if (!BotOwner) {
            message.channel.send(attachment)
        } else {
            message.channel.send('Shutting down...').then(m => {
                client.destroy();
            });
        }
    }
}
