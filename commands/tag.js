// module.exports = {
//     name: 'tag',
//     description: "Look at tags",
//     async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {
//         const Suggest = command;

//         // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
//         const tag = await Tags.findOne({ where: { suggestion: Suggest } });
//         if (tag) {
//             // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
//             tag.increment('usage_count');
//             return message.channel.send(tag.get('description'));
//         }
//         return message.reply(`Could not find tag: ${Suggest}`);
//     }
// }