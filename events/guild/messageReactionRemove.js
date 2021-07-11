const announcement = '❗';
const events = '🥳';
const male = '🇭';
const female = '🇸';
const they = '🇹';
const it = '🇮';
const none = '🇳';
const any = '🇦';
const other = '🇴'
const ask = '❔';

module.exports = async (Discord, client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const guild = reaction.message.guild
    const announcementrole = guild.roles.cache.get('813246611907149845')
    const eventsrole = guild.roles.cache.get('846753111762927656')
    const male_role = guild.roles.cache.get("839516906817585162");
    const female_role = guild.roles.cache.get("839516906817585162");
    const they_role = guild.roles.cache.get("839516906817585162");
    const it_role = guild.roles.cache.get("839516906817585162");
    const none_role = guild.roles.cache.get("839516906817585162");
    const any_role = guild.roles.cache.get("839516906817585162");
    const other_role = guild.roles.cache.get("839516906817585162");
    const ask_role = guild.roles.cache.get("839516906817585162");



    if (reaction.emoji.name === announcement && reaction.message.channel.id === '813249243980496967') return guild.members.cache.get(user.id).roles.remove(announcementrole)
    if (reaction.emoji.name === events && reaction.message.channel.id === '813249243980496967') return guild.members.cache.get(user.id).roles.remove(eventsrole)

    if (reaction.emoji.name === male && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(male_role)
    if (reaction.emoji.name === female && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(female_role)
    if (reaction.emoji.name === they && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(they_role);
    if (reaction.emoji.name === it && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(it_role)
    if (reaction.emoji.name === none && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(none_role)
    if (reaction.emoji.name === any && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(any_role)
    if (reaction.emoji.name === other && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(other_role)
    if (reaction.emoji.name === ask && reaction.message.channel.id === '840173365188624384') return guild.members.cache.get(user.id).roles.add(ask_role)
    return
}