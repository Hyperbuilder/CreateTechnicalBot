const announcement = '❗';
const events = '🥳';
// const male_signrole = '♂️';
// const female_signrole = '♀️';
// const they_signrole = client.emojis.get("840264017830215680")
// const it_signrole = '🇮'

module.exports = async (Discord, client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const guild = client.guilds.cache.find((g) => g.id === '733694336570490921')
    const announcementrole = guild.roles.cache.get('813246611907149845')
    const eventsrole = guild.roles.cache.get('846753111762927656')
    // const male_role = guild.roles.cache.get("839516906817585162");
    // const female_role = guild.roles.cache.get("839516906817585162");
    // const they_role = guild.roles.cache.get("839516906817585162");
    // const it_role = guild.roles.cache.get("839516906817585162");



    if (reaction.emoji.name === announcement && reaction.message.channel.id === '813249243980496967') return guild.members.cache.get(user.id).roles.remove(announcementrole)
    if (reaction.emoji.name === events && reaction.message.channel.id === '813249243980496967') return guild.members.cache.get(user.id).roles.add(eventsrole)

    // if (reaction.emoji.name === male_signrole && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(male_role)
    // if (reaction.emoji.name === female_signrole && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(female_role)
    // if (reaction.emoji.name === they_signrole && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(they_role);
    // if (reaction.emoji.name === it_signrole && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(it_role)




    return
}