module.exports = {
    name: 'startapply',
    description: "this makes the bot say pong",
    async execute(client, message, args, Discord) {
        // put the channel id in the brackets bellow
        const applychannel = '828237716084359189'
        const memberRole = message.guild.roles.cache.find(role => role.name === "member");

        const memberEmoji = '🔵';

        let embed = new Discord.MessageEmbed()
            .setTitle('Apply Here')
            .setDescription(`apply here using`, `🔵`);

        let messageEmbed = await applychannel.send(embed).then(messageEmbed.react(memberEmoji));

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.emoji.name === memberEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(memberRole)

            } else {
                return;
            }
        });
    }
}