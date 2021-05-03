module.exports = (Discord, client, message) => {
    const prefix = '$';
    const strings = require("../../strings/strings.js");
    const activationStrings = require("../../strings/activation-strings");
    let applycommands = ["apply", "cancel", "redo", "setup", "endsetup"];
    const actions = require("../../actions");


    let hasRanCommand = false;

    activationStrings.forEach(str => {
        const strLen = str.length;

        if (message.content.substr(0, strLen) === str) {
            const command = message.content.substr(strLen);

            hasRanCommand = true;
            for (var i = 0; i < applycommands.length; i++) {
                if (message.content.includes(applycommands[i])) {
                    try {
                        console.log(command)
                        actions[command](message);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
    });

    if (!hasRanCommand && message.channel.type === "dm") {
        try {
            actions.directMessage(message, client);
        } catch (e) {
            message.reply(strings.error);
            console.error(e);
        }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return


    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.execute(client, message, args, Discord);
    console.log('MessageEvent handled')
}