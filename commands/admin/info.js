module.exports = {
    name: 'info',
    description: "rules",
    permission: "ADMINISTRATOR",
    async execute(client, message, args, Discord) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Join our Creative and Survival server!')
            .addFields(
                {
                    name: "Create Technical Modpack on Curseforge",
                    value: "https://www.curseforge.com/minecraft/modpacks/create-technical"
                },
                {
                    name: "Survival IP",
                    value: "104.223.101.31:25511"
                },
                {
                    name: "Creative IP",
                    value: "104.223.101.31:25611",
                    inline: true
                },
                {
                    name: "Recommended \*\*JVM\*\* arguments for an extra boost in performance! (Not ensured)",
                    value: " -XX:+UseG1GC -Xmx6G -Xms4G -Dsun.rmi.dgc.server.gcInterval=2147483646 -XX:+UnlockExperimentalVMOptions -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M"
                }
            )
            .setColor('#E98931')
            .setFooter("Note: Server lag can happen. Spamming things like: laggggg wont help")
        message.delete()
        message.channel.send(embed)
    }
}