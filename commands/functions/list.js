const config = require("../../config.json")
const util = require("minecraft-server-util")

module.exports = {
    name: 'list',
    description: "Use /List",
    expArgs: "<none>",
    help: "Command Disabled use /List",
    permission: "ADMINISTRATOR",
    execute(client, message, args, Discord) {
        const list = new MessageEmbed()

        util.queryFull(config.IP, { port: 25511, enableSRV: true, timeout: 5000, sessionID: 1 })
            .then((response) => {
                list.setTitle(`Survival`)
                list.addField(`${onlinePlayers}/${maxPlayers}\n${response.samplePlayers.map(p => p.name).join('\n')}`)
                message.channel.send({ embed: list });
            })
            .catch((error) => {
                throw error;
            });
    }
}