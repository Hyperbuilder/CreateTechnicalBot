const config = require("../../config.json")

module.exports = {
    name: 'status',
    description: "Get serverstatus",
    permission: "ADMINISTRATOR",
    execute(client, message, args, Discord) {
        const ms = require('./minestat');
        const msc = require('./minestat')
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
        })
        msc.init(config.ip, 25611, function (result) {
            message.channel.send("Creative Server status:\nRunning on port " + msc.port + ":");
            if (msc.online) {
                message.channel.send("Server is online with " + msc.current_players + " out of " + msc.max_players + " players.");
                message.channel.send("Message of the day: " + msc.motd);
                message.channel.send("Latency: " + msc.latency + "ms");
            }
            else {
                message.channel.send("Survival is offline!");
            }
        })

    }
}