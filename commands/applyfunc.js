// let applicationQuestions = require("./application-questions.js");
// let usersApplicationStatus = [];
// let appNewForm = [];
// let isSettingFormUp = false;

// // const applicationFormCompleted = (data) => {
//     let i = 0, answers = "";

//     for (; i < applicationQuestions.length; i++) {
//         answers += `${applicationQuestions[i]}: ${data.answers[i]}\n`;
//     }
//     const ApplyChannel = client.channels.cache.get('797422520655413276')
//     ApplyChannel.send(`${data.user.username} has submitted a form.\n${answers}`);
// }


// const sendUserApplyForm = message => {
//     const user = usersApplicationStatus.find(user => user.id === message.author.id);

//     if (!user) {
//         message.author.send(`Apply commands: \`\`\`${prefix}cancel, ${prefix}redo\`\`\``);
//         message.author.send(applicationQuestions[0]);
//         usersApplicationStatus.push({ id: message.author.id, currentStep: 0, answers: [], user: message.author });
//     } else {
//         message.author.send(applicationQuestions[user.currentStep]);
//     }
// };

// const cancelUserApplicationForm = (message, isRedo = false) => {
//     const user = usersApplicationStatus.find(user => user.id === message.author.id);

//     if (user) {
//         usersApplicationStatus = usersApplicationStatus.filter(el => el.id !== user.id)
//         message.reply("Application canceled.");
//     } else if (!isRedo) {
//         message.reply("You have not started an application form yet.");
//     }
// };

// const applicationFormSetup = (message) => {
//     if (!message.guild) {
//         message.reply("This command can only be used in a guild.");
//         return;
//     }

//     if (!message.member.roles.cache.some(r => ["Devs", "Founder"].includes(r.name))) {
//         message.reply("This command can only be used by an admin.");
//         return;
//     }

//     if (isSettingFormUp) {
//         message.reply("Someone else is already configuring the form.");
//         return;
//     }

//     appNewForm = [];
//     isSettingFormUp = message.author.id;

//     message.author.send(`Enter questions and enter \`${prefix}endsetup\` when done.`);
// };

// const endApplicationFormSetup = (message) => {
//     if (isSettingFormUp !== message.author.id) {
//         message.reply("You are not the one setting the form up.");
//         return;
//     }

//     isSettingFormUp = false;
//     applicationQuestions = appNewForm;
// };
