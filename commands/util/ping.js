module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(client, message, args, Discord) {
        //message.channel.send('pong!');
        message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
            console.log(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)
        });
    }
}