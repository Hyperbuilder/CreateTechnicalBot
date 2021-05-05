const actions = require("../../actions")
const ApplyEmoji = '🔵';
const AcceptEmoji = '✅';
const DenyEmoji = '🚫';
const reasonAge = '👶';
const reasonBadFit = '🧩';
const reasonLackOfInfo = '🧠';
const reasonTroll = '🤡';
const reasonCustom = '📝';

module.exports = async (Discord, client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.emoji.name === ApplyEmoji) return actions["apply"](reaction, user);
    if (reaction.emoji.name === AcceptEmoji) return actions["accept"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === DenyEmoji) return actions["deny"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonAge) return actions["reasonAge"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonBadFit) return actions["reasonBadFit"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonLackOfInfo) return actions["reasonLackOfInfo"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonTroll) return actions["reasonTroll"](client, reaction, user, reaction.message.id);
    if (reaction.emoji.name === reasonCustom) return actions["reasonCustom"](client, reaction, user, reaction.message.id);


    return console.log("No Match Found")
}