module.exports = {
    name: 'stop',
    description: "this is a stop command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, BotOwner) {
        if (!BotOwner) {
            return;
        } else {
            message.channel.send('Shutting down...').then(m => {
                client.destroy();
            });
        }
    }
}