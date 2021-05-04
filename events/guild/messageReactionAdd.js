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

    if (reaction.emoji.name === ApplyEmoji) {
        await reaction.message.guild.members.cache.get(user.id)
        console.log(user.username)

        try {
            actions["apply"](reaction, user);
        } catch (e) {
            console.log(e)
        }

    } else if (reaction.emoji.name === AcceptEmoji) {

    } else if (reaction.emoji.name === DenyEmoji) {
        let applycode = reaction.message.id;

        try {
            actions["deny"](client, reaction, user, applycode);
        } catch (e) {
            console.log(e)
        }

    } else {
        return console.log("No Match Found")
    }
}