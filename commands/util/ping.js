module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    expArgs: "<none>",
    help: "Get Ping information",
    permission: "READ_MESSAGE_HISTORY",
    execute(client, message, args, Discord) {
        //message.channel.send('pong!');
        message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
            console.log(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)
        });
    }
}