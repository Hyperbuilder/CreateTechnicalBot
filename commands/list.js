module.exports = {
    name: 'list',
    description: "this is a ping command!",
    async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rcon) {
        rcon.connect().then(() => {
            console.log('Connected!');
            return rcon.send(`/say ${commandArgs}`);
        }).then(response => {
            message.channel.send(response);
            return rcon.disconnect();
        }).then(() => {
            console.log('Disconnected!');
        }).catch(error => {
            console.error(error);
        });
    }
}