// module.exports = {
//     name: 'suggest',
//     description: "Make a Suggestion",
//     async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {

//         SUGGEST COMMAND

//         const Suggest = commandArgs;
//         const embed = new MessageEmbed();
//         const FSuggest = new MessageEmbed();

//         FSuggest.setTitle("Failed Suggestion")
//         FSuggest.addField(`The mod ${commandArgs} has already been made.`, `Sorry`)

//         embed.setTitle("Suggestion");
//         embed.addField('The mod suggested', commandArgs);



//         try {
//             const tag = await Tags.create({
//                 suggestion: Suggest,
//                 username: message.author.username,
//             });
//             console.log('!!A SUGGESTION HAS BEEN MADE!!')
//             Send Embed
//             return message.channel.send({ embed: embed })
//                 React to sended Embed
//                 .then(sentEmbed => {
//                     sentEmbed.react('👍').then(() => sentEmbed.react('👎')).then(() => sentEmbed.react('❌'))
//                     console.log("Embed Reacted")
//                     const filter = (reaction, user) => {
//                         return reaction.emoji.name === '❌' && user.id === message.author.id;
//                     }

//                     const collector = sentEmbed.createReactionCollector(filter, { time: 600000 });
//                     Remove all reactions
//                     collector.on('collect', (reaction, user) => {
//                         console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
//                         sentEmbed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
//                     })
//                 });
//         } catch (e) {

//             if (e.name == 'SequelizeUniqueConstraintError') {
//                 message.channel.send({ embed: FSuggest })
//             }
//         }
//     }
// }