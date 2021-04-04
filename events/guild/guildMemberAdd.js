const ProfileSchema = require("../../ProfileSchema");
const MessageEmbed = require("discord.js")

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        guildID: member.guild.id,
        brass: 1000,
        bank: 0,
    });
    profile.save();
}

const Welcome = new MessageEmbed()
Welcome.setTitle(`Welcome to CT`)
Welcome.addField(`Welcome To Create Technical`, `Hey ${member}, we're excited to have you join our community.\nPlease put your application in the Applications channel. When you recieve your Member role use /whitelist <MinecraftPlayerName> in Bot-channel-and-shaming. \nHave Fun!`)
Guildmember.guild.channels.cache.get('737425690877493309').send({ embed: Welcome });