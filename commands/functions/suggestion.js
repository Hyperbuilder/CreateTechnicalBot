const { MessageEmbed } = require('discord.js')
const { statusMessages } = require('@events/guild/message')
module.exports = {
    name: 'suggestion',
    description: "Make a Suggestion",
    expArgs: "<CurseForge Link>",
    help: "Suggest a Curseforge mod you would like to see in the CT pack",
    permission: "READ_MESSAGE_HISTORY",
    async execute(client, message, args, Discord) {
        const { guild } = message

        const messageId = args.shift()
        const status = messageId.toUpperCase()
        const reason = args.join(' ')

        message.delete()

        const newStatus = statusMessages[status]

        if (!message.member.roles.cache.has('800888754524127233')) return message.channel.send("Role Missing")

        if (!newStatus) {
            message.reply(
                `Unknown status "${status}", please use ${Object.keys(statusMessages)}`
            )
            return
        }

        const channelId = client.channels.cache.get("846739167710281748").id
        if (!channelId) {
            message.reply('An error occurred, please report this')
            return
        }

        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
            message.reply('The suggestion channel no longer exists')
            return
        }

        const targetMessage = await channel.messages.fetch(messageId, false, true)
        if (!targetMessage) {
            message.reply('That message no longer exists')
            return
        }

        const oldEmbed = targetMessage.embeds[0]

        const embed = new MessageEmbed()
            .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
            .setDescription(oldEmbed.description)
            .setColor(newStatus.color)
            .setFooter('Want to suggest something? Simply type it in this channel')

        if (oldEmbed.fields.length === 2) {
            embed.addFields(oldEmbed.fields[0], {
                name: 'Status',
                value: `${newStatus.text}${reason ? ` Reason: ${reason}` : ''}`,
            })
        } else {
            embed.addFields({
                name: 'Status',
                value: `${newStatus.text}${reason ? ` Reason: ${reason}` : ''}`,
            })
        }

        targetMessage.edit(embed)
    }
}


