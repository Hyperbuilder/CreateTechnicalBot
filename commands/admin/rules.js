module.exports = {
    name: 'rules',
    description: "rules",
    permission: "ADMINISTRATOR",
    async execute(client, message, args, Discord) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Welcome to Create Technical!')
            .setDescription("We run a Custom modpack based on https://www.curseforge.com/minecraft/mc-mods/create. It was originally founded on \*\*July 5th, 2020 by CSH and LittleCircles\*\*, but will be run primarily by the former. \nOur goal for the server is to create a Safe, Long Term, Technical Minecraft server for people to build, test, and create cool things with epic mods like \"Create\" and many more with minimal lag without restricting players. \n\n\n\*\*We also have some rules:\*\*")
            .addFields(
                {
                    name: "No promoting your own server / modpack",
                    value: "Please do not promote your own server / modpack in the in-game chat or in Discord."
                },

                {
                    name: "Treat others with respect",
                    value: "There’s no need to say or do things to make others feel bad or upset. Let’s all collaborate and have fun!"
                },
                {
                    name: "No unnecessary pings or DMs",
                    value: "Example: Asking to be whitelisted in DM before being accepted properly will result in a denial of your application!"
                },
                {
                    name: "Verbal and Non-Verbal abuse",
                    value: "Spamming, NSFW, Hate, Discrimination, etc. is not allowed"
                },
                {
                    name: "Griefing is not allowed",
                    value: "Griefing is considered destroying or changing another player’s property or buildings \*\*without\*\* their consent. This also includes spamming or intentionally breaking redstone/create contraptions. \nPlease don’t do it, nobody likes a griefer."
                },
                {
                    name: "Hacking is not allowed",
                    value: "Also on this server External Hack Clients are not allowed (What a suprise ;P) We’ll know if you are. We don’t want to ban anyone. This encompasses any kind of cheat, both in survival and creative."
                },
                {
                    name: "Keep spawn clear",
                    value: "Please build at a distance \*\*greater\*\* than 512 blocks from either respective spawn, both on survival and creative. Nobody wants a crowded spawn area."
                },
                {
                    name: "Waystones & Sharestones",
                    value: "Please use \*\*ONLY\*\* sharestones to mark your areas on creative. Waystones are reserved for getting players to the hub."
                }
            )
            .setColor('#E98931')
            .setFooter("Breaking a Rule can result in a \*\*Punishment\*\*, The rules can be changed at \*\*any\*\* given time")
        message.delete()
        message.channel.send(embed)
    }
}