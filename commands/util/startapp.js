module.exports = {
    async execute(client, message, args, Discord) {
        const memberEmoji = '📁';
        let ex = [
            'Fill in your Age this can be a range or a specific number.',
            'Fill in your Minecraft Username "InGameName"',
            'Where did you see the Create mod for the first time, How did you get to know the mod?',
            'Fill in how long you have played with the Create mod or Modpacks that have Create. This can be any time format',
            'Where did you find out Create Technical was a Server that hosts 2 Minecraft servers using Create? This can be anything: friends, reddit, etc.',
            'Explain in why you would want to join Create Technical, Tip: If you put time in this your chances can be higher so be reasonable and try to avoid a couple of words.',
            'What type of player are you exactly?',
            'Share 1 Picture of your best Create Build! Please add a little description to the Image. This will soon be updated so more Images can be accepted!',
            'Tell us some facts about yourself!',
            'Last Question! What continent are you from? This question is optional.'
        ];
        let applicationQuestions = [
            "What is your age?",
            "What is your Minecraft username?",
            "Where did you learn about the Create mod",
            "How long have you played with the Create mod",
            "Where did you learn about us",
            "Why do you want to join Create Technical?",
            "Are you a technical player, a builder, or neither (does not matter which)?",
            "Share a pictures of your best Create build!",
            "Tell us three facts about yourself!",
            "Which continent are you from"
        ];

        let embed = new Discord.MessageEmbed()
            .setTitle('Click on 📁 below to start an Application form')
            .setDescription(`When clicking the Reaction below you will start your applicationform.\nThis will start in your DirectMessages, so make sure you allow directmessages from this server.\nYou will be needed to fill in all the questions to finish the ApplicationForm\n\nThe Questions:`)
            .setFooter(`Click the 📁 below`)
        for (let l = 0; l < applicationQuestions.length; l++) {
            embed.addField(`${applicationQuestions[l]}:`, `${ex[l]}`, true);
        }

        let messageEmbed = await client.channels.cache.get("839859704075517973").send(embed)
        messageEmbed.react(memberEmoji)
    }
}