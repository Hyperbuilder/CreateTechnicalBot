module.exports = {
    name: 'run',
    description: "Runcommands",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, rconC){
        rconC.connect().then(() => {
            console.log('Connected!');
            return rconC.send(`/${commandArgs}`);
        }).then(response => {
            message.channel.send(response);
            console.log(`----------\n${Date}\nRunned the command ${commandArgs}\n----------`)
            return rconC.disconnect();
        }).then(() => {
            console.log('Disconnected!');
        }).catch(error => {
            console.error(error);
        });
    }
}