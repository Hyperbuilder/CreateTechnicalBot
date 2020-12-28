module.exports = {
    name: 'status',
    description: "Get serverstatus",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config) {
        var ms = require('./minestat');
        ms.init(config.ip, 25511, function (result) {
            message.channel.send("Survival Server status, Running on port " + ms.port + ":");
            if (ms.online) {
                message.channel.send("Server is online with " + ms.current_players + " out of " + ms.max_players + " players.");
                message.channel.send("Message of the day: " + ms.motd);
                message.channel.send("Latency: " + ms.latency + "ms");
            }
            else {
                message.channel.send("Survival is offline!");
            }
        }).then(
            ms.init(config.ip, 25611, function (result) {
                message.channel.send("Creative Server status:\n Running on port " + ms.port + ":");
                if (ms.online) {
                    message.channel.send("Server is online with " + ms.current_players + " out of " + ms.max_players + " players.");
                    message.channel.send("Message of the day: " + ms.motd);
                    message.channel.send("Latency: " + ms.latency + "ms");
                }
                else {
                    message.channel.send("Survival is offline!");
                }
            })
        )
    }
}