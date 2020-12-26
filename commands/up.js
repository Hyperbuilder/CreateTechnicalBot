module.exports = {
    name: 'up',
    description: "this is a ping command!",
    async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rcon) {
        rcon.connect().then(() => {
            console.log('Connected!');
            return rcon.send('/say Check DC');
        }).then(response => {
            console.log(response); // Print the server response to console
            return rcon.disconnect();
        }).then(() => {
            console.log('Disconnected!');
        }).catch(error => {
            console.error(error);
        });
    }
}