module.exports = {
    name: 'removetag',
    description: "remove suggestion",
    async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {
        // equivalent to: DELETE from tags WHERE name = ?;
        const tagName = commandArgs;
        const rowCount = await Tags.destroy({ where: { name: tagName } });
        if (!rowCount) return message.reply('That tag did not exist.');

        return message.channel.send('Tag deleted.');
    }
}