const strings = require("./strings/strings.js");
const activationStrings = require("./activation-strings.js");

let applicationQuestions = require("./application-questions.js");
const { MessageEmbed, Message } = require("discord.js");
const { Error } = require("mongoose");

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
    let i = 0, answers = "";

    for (; i < applicationQuestions.length; i++) {
        answers += `${applicationQuestions[i]}: ${data.answers[i]}\n`;
    }


    const userSubmitString = strings.formReceiveMessage({
        user: data.user.username,
        botChar: activationStrings[0]
    });

    const answerEmbed = new MessageEmbed
    answerEmbed.setTitle(`${userSubmitString}`)
    answerEmbed.setDescription(`${answers}`)

    const Accept = '✅';
    const Deny = '🚫';
    console.log(`FINISHED APPLICATION Client: ${client}, ${client.channels}`)
    let AnswerMessage = await client.channels.cache.get("797422520655413276").send(answerEmbed)
    AnswerMessage.react(Accept).then(() => AnswerMessage.react(Deny))
};

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
    await reaction.users.remove(user).catch(console.error);
};

module.exports = {
    directMessage: (msg, client) => {
        if (msg.author.id === isSettingFormUp) {
            appNewForm.push(msg.content);
        } else {
            const user = usersApplicationStatus.find(user => user.id === msg.author.id);

            if (user && msg.content) {
                user.answers.push(msg.content);
                user.currentStep++;

                if (user.currentStep >= applicationQuestions.length) {
                    usersApplicationStatus = usersApplicationStatus.filter(item => item.id != user.id);

                    console.log(`DirectMessage Client: ${client}`)
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

    cancel: msg => {
        cancelUserApplicationForm(msg);
    },

    redo: msg => {
        cancelUserApplicationForm(msg, true);
        sendUserApplyForm(msg);
    }
};