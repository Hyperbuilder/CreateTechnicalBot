module.exports = (Discord, client, message) => {
    const prefix = '!'
    const strings = require("../../strings/strings.js")
    const actions = require("../../")

    if (!message.content.startsWith(prefix) || message.author.bot) return

    let hasRanCommand = false;
    const strLen = str.length;

    if (msg.content.substr(0, strLen) === prefix) {
        const command = msg.content.substr(strLen);

        hasRanCommand = true;

        if (!actions[command])
            msg.reply(strings.unknownCommand);

        try {
            actions[command](msg);
        } catch (e) {
            msg.reply(strings.error);
            console.error(e);
        }
    }

    if (!message.cintent.startsWith(prefix) && msg.channel.type === "dm") {
        try {
            actions.directMessage(msg);
        } catch (e) {
            msg.reply(strings.error);
            console.error(e);
        }
        return
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.execute(client, message, args, Discord);
    console.log('MessageEvent handled')
}