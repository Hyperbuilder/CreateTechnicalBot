const { MessageEmbed } = require('discord.js');
const economy = require('../../economy')

module.exports = {
    name: "balance",
    description: "Get the balance of a user",
    expArgs: "<User> (Optional)",
    help: "Search the Economy data base for someones Balance",
    async execute(client, message) {
        console.log('recieved command')

        const target = message.mentions.user.first() || message.author
        const targetId = target.id

        console.log('ID:' + targetId);
        const guildId = message.guild.id
        const userId = target.id

        const brass = await economy.getcoins(guildId, userId)

        const Embed = new MessageEmbed()

        Embed.setTitle('GambleBot')
        Embed.addField('Balance:', `${target} has ${brass} Brass!`)
    }


}