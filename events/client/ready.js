const mongo = require("../../mongo")
const actions = require("../../actions")


module.exports = async (Discord, client) => {
    console.log(`CT Test + Gamble bot is running`)

    await mongo().then(mongoose => {
        try {
            console.log('Connected to MongoDB')
        } finally {
            mongoose.connection.close()
        }
    })

    const memberEmoji = '🔵';

    let embed = new Discord.MessageEmbed()
        .setTitle('Apply Here')
        .setDescription(`apply here using: 🔵`);

    let messageEmbed = await client.channels.cache.find(channel => channel.id === "828237716084359189").send(embed)
    messageEmbed.react(memberEmoji)

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.emoji.name === memberEmoji) {
            await reaction.message.guild.members.cache.get(user.id)
            console.log(reaction.users)

            try {
                actions["apply"](reaction);
            } catch (e) {
                console.error(e)
            }
        } else {
            return;
        }
    });

}