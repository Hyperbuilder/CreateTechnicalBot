module.exports = {
    name: 'reactionrole',
    description: "this makes the bot say pong",
    async execute(client, message, args, Discord) {

        const announcement = '❗';
        const events = '🥳';
        const male_signrole = '♂️';
        const female_signrole = '♀️';
        const they_signrole = client.emojis.get("840264017830215680")
        const it_signrole = '🇮'


        let embed = new Discord.MessageEmbed()
            .setTitle('Reaction roles!')

        message.channel.send(embed).then(async (embed) => {
            await embed.react(announcement)
            await embed.react(events);
            await embed.react(male_signrole)
            await embed.react(female_signrole)
            await embed.react(they_signrole)
            await embed.react(it_signrole)
        });
    }



}