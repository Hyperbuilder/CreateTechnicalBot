module.exports = {
    name: 'run',
    description: "Runcommands",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, config) {
        const util = require('minecraft-server-util');

        const client = new util.RCON(`${config.ip}`, { port: 25575, enableSRV: true, timeout: 5000, password: `${config.RconPass}`});
        client.on('output', (message) => console.log(message));

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