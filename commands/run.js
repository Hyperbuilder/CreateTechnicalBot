module.exports = {
    name: 'run',
    description: "Runcommands",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, config) {
        const util = require('minecraft-server-util');
        const ip = config.ip
        const password = config.RconPass


        const client = new util.RCON(`${ip}`, { port: 25575, enableSRV: false, timeout: 5000, password: `${password}`});
        client.on('output', (message) => message.channel.send(message));

        client.connect()
            .then(async () => {
                await client.run(`${commandArgs}`).then(() => message.channel.send(`${commandArgs} executed correctly`));

                client.close();
            })
            .catch((error) => {
                throw error;
            });
    }
}