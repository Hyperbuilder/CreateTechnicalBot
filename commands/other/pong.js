module.exports = {
    name: 'pong',
    description: "this is a pong command!",
    expArgs: "<none>",
    help: "Steal someones job!",
    permission: "READ_MESSAGE_HISTORY",
    execute(client, message, args, Discord) {
        message.channel.send('Ping! \nWai... Wait...You stole my job D:')
    }
}