module.exports = {
    name: 'reactionrole',
    description: "this makes the bot say pong",
    async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {
        // put the channel id in the brackets bellow
        const rrchannel = '787497982462525450'
        const memberRole = message.guild.roles.cache.find(role => role.name === "member");

        const memberEmoji = '👀';

        let embed = new Discord.MessageEmbed()
            .setTitle('By reacting you agree that you will recieve Discord pings!')
            .setDescription('Reacting will give you a role that will be pinged when an announcement is made!\n\n'
                + `${memberEmoji} So you can join\n`);

        let messageEmbed = await rrchannel.send(embed).then(messageEmbed.react(memberEmoji));

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