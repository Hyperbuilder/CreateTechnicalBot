module.exports = {
    name: 'help',
    description: "this will give you some Help",
    execute(message, args) {

        //Create Embed 
        const Help = {
            color: 0x0299ff,
            title: 'All the commands I have in store.',
            author: {
                name: 'Help page',
            },
            fields: [
                {
                    name: '!Help',
                    value: '\`Shows this message\`',
                    inline: true
                },
                {
                    name: '!Suggest',
                    value: '\`For **making** a Suggestion\`',
                    inline: true,
                },
                {
                    name: '!Shame',
                    value: '\`Shame someone\`',
                    inline: true,
                },
                {
                    name: '!Suggested',
                    value: '\`shows the Suggestions you made and the \"Code\"\` \n to be added',
                    inline: false,
                    //with 
                },
                {
                    name: '!Ping',
                    value: '\`Play pong!\`',
                    inline: true,
                },
                {
                    name: '!Pong',
                    value: '\`Steal someones job!\`',
                    inline: true,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Made for the Create Technical Discord Server',
                icon_url: 'https://imgur.com/fYkZ9na',
            },
        };

        //Send Embed
        message.channel.send({ embed: Help });
    }
}