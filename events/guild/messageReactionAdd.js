const actions = require("../../actions")
const ApplyEmoji = '📁';
const AcceptEmoji = '✅';
const DenyEmoji = '🚫';
const reasonAge = '👶';
const reasonBadFit = '🧩';
const reasonCustom = '📝';

module.exports = async (Discord, client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.emoji.name === ApplyEmoji && reaction.message.channel.id === '839859704075517973') return actions["apply"](reaction, user);
    if (reaction.emoji.name === AcceptEmoji && user.id === '410953870643298314') return actions["accept"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === DenyEmoji && user.id === '410953870643298314') return actions["deny"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonAge && user.id === '410953870643298314') return actions["reasonAge"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonBadFit && user.id === '410953870643298314') return actions["reasonBadFit"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonCustom && user.id === '410953870643298314') return actions["reasonCustom"](client, reaction, user, reaction.message.id);


    return console.log("No Match Found")
}