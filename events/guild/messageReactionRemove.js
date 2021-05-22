const announcement = '❗';


module.exports = async (Discord, client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const guild = client.guilds.cache.find((g) => g.id === '736160722311970877')
    const announcementrole = guild.roles.cache.get("839516906817585162");
    if (reaction.emoji.name === announcement && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.remove(announcementrole)
    return
}