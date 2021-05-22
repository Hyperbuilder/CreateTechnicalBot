const mongo = require("../../mongo");
const ProfileSchema = require("../../Schema/ProfileSchema");

module.exports = async (client, discord, member) => {
    // await mongo().then(mongoose => {
    //     try {
    //         let profile = await ProfileSchema.create({
    //             userID: member.id,
    //             guildID: member.guild.id,
    //             brass: 1000,
    //             bank: 0,
    //             xp: 0,
    //             level: 1
    //         });
    //         profile.save();
    //     } finally {
    //         mongoose.connection.stop()
    //     }
    // })
    const Welcome = new MessageEmbed()
    Welcome.setTitle(`Welcome to CT`)
    Welcome.addField(`Welcome To Create Technical`, `Hey ${member}, we're excited to have you join our community.\nPlease start an application form in <#839859704075517973> channel. When you recieve your Member role use /whitelist <MinecraftPlayerName> in <#778816644284940328>. \nHave Fun!`)
    member.guild.channels.cache.get('737425690877493309').send({ embed: Welcome });

}