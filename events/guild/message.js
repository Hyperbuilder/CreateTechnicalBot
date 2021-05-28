const config = require("../../config.json")
const prefix = config.prefix;
const strings = require("../../strings/strings.js");
const activationStrings = require("../../strings/activation-strings");
let applycommands = ["cancel", "redo"];
const actions = require("../../actions");
const statusMessages = {
    WAITING: {
        text: '📊 Waiting for community feedback, please vote!',
        color: 0xe98931,
    },
    ACCEPTED: {
        text: '✅ Accepted the mod Suggestion!',
        color: 0x34eb5b,
    },
    DENIED: {
        text:
            '❌ Thank you for the feedback, but we are not interested in this idea at this time.',
        color: 0xc20808,
    },
}
const { MessageEmbed } = require("discord.js")

module.exports = async (Discord, client, message) => {

    const { channel, content, member } = message


    const ChannelID = client.channels.cache.find(channel => channel.id === "846739167710281748").id;
    if (ChannelID && ChannelID === channel.id && !member.user.bot) {
        message.delete()

        const status = statusMessages.WAITING

        const embed = new MessageEmbed()
            .setColor(status.color)
            .setAuthor(member.displayName, member.user.displayAvatarURL())
            .setDescription(content)
            .addFields({
                name: 'Status',
                value: status.text,
            })
            .setFooter('Want to suggest something? Simply type it in this channel')

        channel.send(embed).then((message) => {
            message.react('👍').then(() => {
                message.react('👎')
            })
        })
    }

    let hasRanCommand = false;
    for (var i = 0; i < applycommands.length; i++) {
        if (message.content.includes(applycommands[i])) {

            activationStrings.forEach(str => {
                const strLen = str.length;

                if (message.content.substr(0, strLen) === str) {
                    const command = message.content.substr(strLen);

                    hasRanCommand = true;

                    try {
                        console.log(command)
                        actions[command](message);
                    } catch (e) {
                        console.error(e);
                    }
                }

            })
        }
    };

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
    console.log(command)


}
module.exports.statusMessages = statusMessages