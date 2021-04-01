// module.exports = {
//     name: 'tag',
//     description: "Look at tags",
//     async execute(message, commandArgs, command, Tags) {
//         const Suggest = command;

//         // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
//         const tag = await Tags.findOne({ where: { suggestion: Suggest } });
//         if (tag) {
//             return message.channel.send(`${Suggest} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
//         }
//         return message.reply(`Could not find tag: ${Suggest}`);
//     }
// }