module.exports = {
    name: 'invite',
    description: "this will give you The invite link",
    execute(client, message, args, Discord) {
        message.channel.send('https://discord.gg/gZrh7N4');
    }
}