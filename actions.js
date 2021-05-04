const strings = require("./strings/strings.js");
const activationStrings = require("./strings/activation-strings.js");

let applicationQuestions = require("./strings/application-questions.js");
const { MessageEmbed, Message } = require("discord.js");
const { Error } = require("mongoose");
const applydb = require("./applydb")

let isSettingFormUp = false;
let appNewForm = [];
let usersApplicationStatus = [];


const authorAuthorization = msg => {
    const authorId = msg.author.id;

    const role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === strings.adminRole.toLowerCase());

    const guildMember = msg.guild.members.cache.find(member => member.id === authorId);

    if (!role) {
        msg.reply(strings.unknownRole);
        return false;
    }

    const roleFromUser = guildMember.roles.cache.get(role.id);

    if (!roleFromUser) {
        msg.reply(strings.notAuth);
        return false;
    }

    return true;
};

const applicationFormCompleted = async (data, client) => {

    const userSubmitString = strings.formReceiveMessage({
        user: data.user.username,
        botChar: activationStrings[0]
    });

    const answerEmbed = new MessageEmbed;
    answerEmbed.setTitle(`${userSubmitString}`);

    for (let aloop = 0; aloop < applicationQuestions.length; aloop++) {
        answerEmbed.addField(`${applicationQuestions[aloop]}:`, `${data.answers[aloop]}`, true);
    }

    const Accept = '✅';
    const Deny = '🚫';
    let AnswerMessage = await client.channels.cache.get("797422520655413276").send(answerEmbed);
    AnswerMessage.react(Accept).then(() => AnswerMessage.react(Deny));

    const lastmessagechannel = client.channels.cache.get("797422520655413276")
    const messages = await lastmessagechannel.messages.fetch({ limit: 1 });
    const lastMessage = messages.last();

    const applydb = require('./applydb');
    const applycode = lastMessage.id;
    const userId = data.user.id;

    console.log('recieved command');
    console.log(`ApplyID: ${applycode}\nUserID: ${userId}`);

    const addApplication = await applydb.addApp(userId, applycode);
};

const denyUserApplyForm = async (client, reaction, user, applycode) => {
    console.log(`ApplyCode: ${applycode}`)

    const userID = await applydb.denyApp(applycode)

    console.log(`userID result: ${userID}`)

    client.users.fetch(userID).then((user) => {
        user.send(strings.defaultRejectMessage);
    })

    const mchannel = await client.channels.cache.get("797422520655413276")
    //User that submitted the application
    const denieduser = client.users.cache.find(user => user.id === applycode)

    await mchannel.messages.fetch(applycode).then(async (message) => {
        // Remove all reactions, edit the embed to *Denied* status, Update status in DataBase and Transfer to Denied apps channel.
        message.reactions.removeAll()

        //list of reactions
        const reasonAge = '👶';
        const reasonBadFit = '🧩';
        const reasonLackOfInfo = '🧠';
        const reasonTroll = '🤡';
        const reasonCustom = '📝';

        try {
            await message.react(reasonAge);
            await message.react(reasonBadFit);
            await message.react(reasonLackOfInfo);
            await message.react(reasonTroll);
            await message.react(reasonCustom);
        } catch (e) { }
    })



}

const cancelUserApplicationForm = (msg, isRedo = false) => {
    const user = usersApplicationStatus.find(user => user.id === msg.author.id);

    if (user) {
        usersApplicationStatus = usersApplicationStatus.filter(el => el.id !== user.id)
        msg.reply(strings.applicationCancel);
    } else if (!isRedo) {
        msg.reply(strings.applicationFormFalseCancel);
    }
};

const sendUserApplyForm = msg => {
    const user = usersApplicationStatus.find(user => user.id === msg.author.id);

    if (user.bot) return;
    if (!user) {
        const userApplyString = strings.formApplyMessage({
            user: msg.author.username,
            botChar: activationStrings[0]
        });

        msg.author.send(userApplyString);
        msg.author.send(applicationQuestions[0]);
        usersApplicationStatus.push({ id: msg.author.id, currentStep: 0, answers: [], user: msg.author });
    } else {
        msg.author.send(applicationQuestions[user.currentStep]);
    }
};

const sendUserApplyFormReaction = async (reaction, user) => {
    const finduser = user.id;
    const reactionuser = usersApplicationStatus.find(user => user.id === finduser);

    if (user.bot) return;
    if (!reactionuser) {
        const userApplyString = strings.formApplyMessage({
            user: user.username,
            botChar: activationStrings[0]
        });

        user.send(userApplyString);
        user.send(applicationQuestions[0]);
        usersApplicationStatus.push({ id: user.id, currentStep: 0, answers: [], user: user });
    } else {
        user.send(applicationQuestions[user.currentStep]);
    }
    await reaction.users.remove(user);
};

module.exports = {
    directMessage: (msg, client) => {
        if (msg.author.id === isSettingFormUp) {
            appNewForm.push(msg.content);
        } else {
            const user = usersApplicationStatus.find(user => user.id === msg.author.id);

            if (user && msg.content) {

                let dirtyString = msg.content;
                let cleanString = dirtyString.replace(/[|$%@"\`<>()+]/g, "");
                if (msg.content.length > 1000) return msg.author.send(`Your message with a length of ${msg.content.length} characters exceeds our limit of 1000. Try to shorten your message`)
                user.answers.push(cleanString);
                user.currentStep++;
                console.log(`User: ${msg.author.username}, is at step: ${user.currentStep} `)
                if (user.currentStep >= applicationQuestions.length) {
                    usersApplicationStatus = usersApplicationStatus.filter(item => item.id != user.id);

                    applicationFormCompleted(user, client);

                    msg.author.send(strings.applicationSent);
                } else {
                    msg.author.send(applicationQuestions[user.currentStep]);
                }
            }
        }
    },

    setup: msg => {
        if (!msg.guild) {
            msg.reply(strings.notInGuild);
            return;
        }

        if (!authorAuthorization(msg))
            return;

        if (isSettingFormUp) {
            msg.reply(strings.formSetupInProgress);
            return;
        }

        appNewForm = [];
        isSettingFormUp = msg.author.id;

        const adminSetupString = strings.formSetupMessage({
            user: msg.author.username,
            botChar: activationStrings[0]
        });

        msg.author.send(adminSetupString);
    },

    endsetup: msg => {
        if (isSettingFormUp !== msg.author.id) {
            msg.reply(strings.formSetupInProgress);
            return;
        }

        applicationQuestions = appNewForm;

        isSettingFormUp = false;
        appNewForm = [];

        msg.reply(strings.newFormSetup);
    },

    apply: (reaction, user) => {
        sendUserApplyFormReaction(reaction, user);
    },

    deny: (client, reaction, user, applycode) => {
        denyUserApplyForm(client, reaction, user, applycode)
    },

    cancel: msg => {
        cancelUserApplicationForm(msg);
    },

    redo: msg => {
        cancelUserApplicationForm(msg, true);
        sendUserApplyForm(msg);
    }
};