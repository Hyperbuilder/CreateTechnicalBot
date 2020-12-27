module.exports = {
    name: 'list',
    description: "this is a ping command!",
    async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconS, rconC) {
        rconS.connect().then(() => {
            console.log('Connected!');
            return rcon.send(`/list`);
        }).then(response => {
            message.channel.send(response);
            return rcon.disconnect();
        }).then(() => {
            console.log('Disconnected!');
        }).catch(error => {
            console.error(error);
        });
        rconC.connect().then(() => {
            console.log('Connected!');
            return rcon.send(`/list`);
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