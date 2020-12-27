module.exports = {
    name: 'whitelist',
    description: "Me want whitelist",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconS, rconC) {
        const channel = client.channels.cache.get(config.whitechannel)
        const author = message.author
        if (message.channel.id === 736160832790200340) {
            rconS.connect().then(() => {
                console.log('Connected!');
                return rcon.send(`/whitelist add ${commandArgs}`);
            }).then(response => {
                message.channel.send(response);
                console.log(`${commandArgs} has been whitelisted`)
                return rcon.disconnect();
            }).then(() => {
                console.log('Disconnected!');
            }).catch(error => {
                console.error(error);
            });

            rconC.connect().then(() => {
                console.log('Connected!');
                return rcon.send(`/whitelist add ${commandArgs}`);
            }).then(response => {
                message.channel.send(response);
                console.log(`${commandArgs} has been whitelisted`)
                return rcon.disconnect();
            }).then(() => {
                console.log('Disconnected!');
            }).catch(error => {
                console.error(error);
            });
            console.log('Whitelisted someone')
        } else {
            channel.send(`${author} Wants to be whitelisted, Their IGN: ${commandArgs}`)
            message.channel.send('The devs and owner have been notified!')
        }
    }
}