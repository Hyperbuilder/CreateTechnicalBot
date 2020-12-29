module.exports = {
    name: 'run',
    description: "Runcommands",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, rconC) {
        rconC.on('output', (message) => console.log(message));

        rconC.connect()
            .then(async () => {
                await rconC.run(`${commandArgs}`);

                rconC.close();
            })
            .catch((error) => {
                message.channel.send(error)
                throw error;
            });
    }
}