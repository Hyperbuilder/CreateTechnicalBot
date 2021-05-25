module.exports = {
    name: 'reactionrole',
    description: "Start Reaction roles",
    permission: "ADMINISTRATOR",
    async execute(client, message, args, Discord) {

        message.delete()

        const announcement = '❗';
        const events = '🥳';
        const male_signrole = '♂️';
        const female_signrole = '♀️';
        const they_signrole = client.emojis.get("840264017830215680")
        const it_signrole = '🇮'


        let embed = new Discord.MessageEmbed()
            .setTitle('Reaction roles!')
            .setDescription("React to the emoji's to recieve the corresponding role!")
            .addField("Emoji's", `Announcements: ${announcement}, Get pinged when an announcement is made.\nEvents: ${events}, Get Pinged when an Event is planned`)
            .setColor('#E98931')

        message.channel.send(embed).then(async (embed) => {
            await embed.react(announcement)
            await embed.react(events);
            // await embed.react(male_signrole)
            // await embed.react(female_signrole)
            // await embed.react(they_signrole)
            // await embed.react(it_signrole)
        });
    }



}