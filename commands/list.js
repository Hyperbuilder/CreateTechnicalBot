module.exports = {
    name: 'list',
    description: "this is a ping command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, util) {
        const list = new MessageEmbed()

        util.queryFull(`${config.ip}`, { port: 25511, enableSRV: true, timeout: 5000, sessionID: 0 })
            .then((response) => {
                list.setTitle(`Survival`)
                list.addField(`${onlinePlayers}/${maxPlayers}\n${response.samplePlayers.map(p => p.name).join('\n')}`)
                message.channel.send( {embed: list} );
            })
            .catch((error) => {
                throw error;
            });
    }
}