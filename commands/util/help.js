const { MessageEmbed } = require('discord.js');
const config = require("../../config.json")
const prefix = config.prefix;

module.exports = {
    name: "help",
    description: "<command-name>",
    help: "Sends this help command",
    expArgs: "<command>",
    async execute(client, message, args) {

        try {
            let embed = new MessageEmbed()
                .setTitle(`Help command`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("GREEN")
                .setTimestamp()
                .setDescription(client.commands.map(c => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'))
            if (!args[0]) return message.channel.send("", { embed: embed, mention: true })
            let cmd = client.commands.get(args[0].toLowerCase())
            if (!cmd) {
                embed.setColor("RED")
                    .setDescription("Requested command was not found")
                    .setTitle("404 Not Found")
                return message.channel.send("", { embed: embed, mention: true })
            } else {
                embed.setTitle(cmd.name)
                    .setDescription(cmd.help)
                    .addFields({ name: 'Syntax', value: `\`\`\`${prefix}${cmd.name}${cmd.expArgs ? " " + cmd.expArgs : ""}\`\`\`` })
                message.channel.send("", { embed: embed, mention: true })
            }


        } catch (e) {
        }
    },
}
