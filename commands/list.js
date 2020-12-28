module.exports = {
    name: 'list',
    description: "this is a ping command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconS, rconC) {
        var ms = require('./minestat');
        ms.init(config.ip, 25511, function (result) {
            message.channel.send("Survival Server Players list, Running on port " + ms.port + ":");
            if (ms.online) {
                message.channel.send("Server is online with " + ms.current_players + " out of " + ms.max_players + " players.");
            }
            else {
                message.channel.send("Survival is offline!");
            }
        })
    }
}