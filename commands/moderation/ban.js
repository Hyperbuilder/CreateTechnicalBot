module.exports = {
    name: "ban",
    description: "Ban command",
    expArgs: "<Target>",
    help: "Admin command to ban users",
    permission: "ADMINISTRATOR",
    async execute(client, message, args) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if (message.members.mentions.first()) {
                try {
                    message.members.mentions.first().ban();
                } catch {
                    message.channel.send(`I do not have permissions to ban ${message.members.mentions.first()}`);
                }
            } else {
                message.channel.send(`You do not have permissions to ban ${message.members.mentions.first()}`);
            }
        }
    }
}
