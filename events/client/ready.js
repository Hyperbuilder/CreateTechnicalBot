const mongo = require("../../mongo")
const actions = require("../../actions")
const chalk = require('chalk');

const error = chalk.black.bgRedBright;
const warning = chalk.keyword('orange');
const log = chalk.blueBright;
const info = chalk.cyanBright;
const success = chalk.keyword('lime');


module.exports = async (Discord, client) => {
    console.log(success(`CT Test + Gamble bot is running`));

    await mongo().then(mongoose => {
        try {
            console.log(info(`Connected to MongoDB`))
        } finally {
            mongoose.connection.close()
        }
    })

    const memberEmoji = '🔵';

    let embed = new Discord.MessageEmbed()
        .setTitle('Start an Application Form')
        .setDescription(`To start an Application form click the reaction below! \n Note that we try to review your Application within 24h, Sometimes it can take longer.`);

    let messageEmbed = await client.channels.cache.find(channel => channel.id === "828237716084359189").send(embed)
    messageEmbed.react(memberEmoji)

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.emoji.name === memberEmoji) {
            await reaction.message.guild.members.cache.get(user.id)
            console.log(log(user.username))

            try {
                actions["apply"](reaction, user);
            } catch (e) {
                console.log(error(e))
            }
        } else {
            return;
        }
    });

}