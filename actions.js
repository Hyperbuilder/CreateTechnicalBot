const strings = require("./strings/strings.js");
const activationStrings = require("./strings/activation-strings.js");

let applicationQuestions = require("./strings/application-questions.js");
const { MessageEmbed, Message } = require("discord.js");
const error = require("./Utils/error.js")
const applydb = require("./applydb")

let isSettingFormUp = false;
let appNewForm = [];
let usersApplicationStatus = [];

const applicationFormCompleted = async (data, client) => {

    const userSubmitString = strings.formReceiveMessage({
        user: data.user.username,
        botChar: activationStrings[0]
    });

    //CHANGE ID !!!!!!!!
    const guild = client.guilds.cache.find((g) => g.id === '733694336570490921');
    const member = await guild.members.cache.get(data.user.id)


    const answerEmbed = new MessageEmbed;
    answerEmbed.setTitle(`${userSubmitString}`);
    answerEmbed.setDescription(`${data.user} has submitted a form. They joined on "removed until further notice"`)
    answerEmbed.setFooter(`Accept: *✅*, Deny: *🚫*, Step 2 Deny: Age: *👶*, BadFit: *🧩*, Custom message: 📝`)
    answerEmbed.setAuthor(`${member.user.username}`, `${member.user.avatarURL()}`)
    for (let aloop = 0; aloop < applicationQuestions.length; aloop++) {
        answerEmbed.addField(`${applicationQuestions[aloop]}:`, `${data.answers[aloop]}`, true);
    }

    const Accept = '✅';
    const Deny = '🚫';
    //send embed with the application
    let AnswerMessage = await client.channels.cache.get("797422520655413276").send(answerEmbed);
    AnswerMessage.react(Accept).then(() => AnswerMessage.react(Deny));

    //fetch the ID of the application message
    const lastmessagechannel = client.channels.cache.get("797422520655413276")
    const messages = await lastmessagechannel.messages.fetch({ limit: 1 });
    const lastMessage = messages.last();

    const applycode = lastMessage.id;
    const userId = data.user.id;

    //add the application
    const addApplication = await applydb.addApp(userId, applycode, data.answers);
};

const acceptUserApplyForm = async (client, reaction, user, applycode) => {

    const userID = await applydb.acceptApp(applycode)

    const guild = client.guilds.cache.find((g) => g.id === '733694336570490921')
    let role = (guild.roles.cache.get("733785266745245737"));

    if (!guild) return console.log("No Guild FOUND")
    guild.members.cache.get(userID).roles.add(role).then((user) => {
        user.send(`Hello ${user}, I have great news.\nYou have been accepted to Create Technical.\nTake a minute to read all the rules again, Thank you. \nHave Fun! Greetings The Create Technical Team`)
    })
};

const denyUserApplyForm = async (client, reaction, user, applycode) => {

    const userID = await applydb.denyApp(applycode)

    client.users.fetch(userID).then((user) => {
        user.send(strings.defaultRejectMessage);
        error.send(`${user}'s Application has been denied`)
    })

    const mchannel = await client.channels.cache.get("797422520655413276")

    await mchannel.messages.fetch(applycode).then(async (message) => {
        message.reactions.removeAll()

        //list of reactions
        const reasonAge = '👶';
        const reasonBadFit = '🧩';
        const reasonBadApp = '📋';
        const reasonCustom = '📝';

        try {
            await message.react(reasonAge);
            await message.react(reasonBadFit);
            await message.react(reasonBadApp);
            await message.react(reasonCustom);
        } catch (e) { console.log(e) }
    })
}

const deniedReasonAge = async (client, reaction, user, applycode) => {
    const userID = await applydb.denyApp(applycode)

    client.users.fetch(userID).then((user) => {
        const userAgeDenyString = strings.reasonAgeMessage({
            user: user.username,
        });
        user.send(userAgeDenyString)
    })

    const mchannel = await client.channels.cache.get("797422520655413276")
    await mchannel.messages.fetch(applycode).then(async (message) => {
        message.reactions.removeAll()
    })
}

const deniedReasonBadFit = async (client, reaction, user, applycode) => {
    const userID = await applydb.denyApp(applycode)

    client.users.fetch(userID).then((user) => {
        const userFitDenyString = strings.reasonBadFitMessage({
            user: user.username,
        });
        user.send(userFitDenyString)
    })

    const mchannel = await client.channels.cache.get("797422520655413276")
    await mchannel.messages.fetch(applycode).then(async (message) => {
        message.reactions.removeAll()
    })
}

const deniedreasonBadApp = async (client, reaction, user, applycode) => {
    const userID = await applydb.denyApp(applycode)

    client.users.fetch(userID).then((user) => {
        const userAppDenyString = strings.reasonBadAppMessage({
            user: user.username,
        });
        user.send(userAppDenyString)
    })

    const mchannel = await client.channels.cache.get("797422520655413276")
    await mchannel.messages.fetch(applycode).then(async (message) => {
        message.reactions.removeAll()
    })
}

const deniedReasonCustom = async (client, reaction, user, applycode) => {

    const userID = await applydb.denyApp(applycode)



    const msg = await user.send('\`\`\`Please fill in decline message\`\`\`');
    const filter = collected => collected.author.id === user.id;
    const collected = await msg.channel.awaitMessages(filter, {
        max: 1
    })

    if (collected.first()) {
        user.send(`Your Custom message: \n${collected.first().content} \nAnswer with \`accept\` to send or with \`cancel\` to cancel`);
        const filter2 = collected2 => collected2.author.id === user.id;
        const collected2 = await msg.channel.awaitMessages(filter2, {
            max: 1
        })
        if (collected2.first().content.toLowerCase() === 'cancel') return user.reply("Message has been canceled, react to the Emoji again for another try!")
        if (collected2.first().content.toLowerCase() === 'accept') {
            const mchannel = await client.channels.cache.get("797422520655413276")
            await mchannel.messages.fetch(applycode).then(async (message) => {
                message.reactions.removeAll()
            })
            client.users.fetch(userID).then((user) => {
                user.send(collected.first().content)
            })
        }
    }


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
            if (user && msg.content && msg.attachments.size > 0) {
                msg.attachments.forEach(attachment => {

                    const url = attachment.url;
                    let dirtyString = msg.content + url;



                    let cleanString = dirtyString.replace(/[|$%@"\`<>();+]/g, "");

                    if (msg.content.length > 1000) return msg.author.send(`Your message with a length of ${msg.content.length} characters exceeds our limit of 1000. Try to shorten your message`)
                    user.answers.push(cleanString);
                    user.currentStep++;
                    let now = new Date()
                    console.log(`User: ${msg.author.username}, answer: ${user.answers[user.currentStep - 1]}\n ${now}\n--- `)
                    if (user.currentStep >= applicationQuestions.length) {
                        usersApplicationStatus = usersApplicationStatus.filter(item => item.id != user.id);

                        applicationFormCompleted(user, client);

                        msg.author.send(strings.applicationSent);
                    } else {
                        msg.author.send(applicationQuestions[user.currentStep]);
                    }
                })

            }
            if (user && msg.content && msg.attachments.size <= 0) {
                let dirtyString = msg.content



                let cleanString = dirtyString.replace(/[|$%@"\`<>();+]/g, "");

                if (msg.content.length > 1000) return msg.author.send(`Your message with a length of ${msg.content.length} characters exceeds our limit of 1000. Try to shorten your message`)
                user.answers.push(cleanString);
                user.currentStep++;
                console.log(`User: ${msg.author.username}, answer: ${user.answers[user.currentStep - 1]} `)
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

    apply: (reaction, user) => {
        sendUserApplyFormReaction(reaction, user);
    },

    deny: (client, reaction, user, applycode) => {
        denyUserApplyForm(client, reaction, user, applycode)
    },

    accept: (client, reaction, user, applycode) => {
        acceptUserApplyForm(client, reaction, user, applycode)
    },

    cancel: msg => {
        cancelUserApplicationForm(msg);
    },

    redo: msg => {
        cancelUserApplicationForm(msg, true);
        sendUserApplyForm(msg);
    },

    reasonAge: (client, reaction, user, applycode) => {
        deniedReasonAge(client, reaction, user, applycode)
    },

    reasonBadFit: (client, reaction, user, applycode) => {
        deniedReasonBadFit(client, reaction, user, applycode)
    },

    reasonBadApp: (client, reaction, user, applycode) => {
        deniedreasonBadApp(client, reaction, user, applycode)
    },

    reasonCustom: (client, reaction, user, applycode) => {
        deniedReasonCustom(client, reaction, user, applycode)
    }
};