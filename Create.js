const config = require('./config')
//Consts
const Discord = require('discord.js');

const client = new Discord.Client();
const { MessageEmbed, Message, Guild, DiscordAPIError } = require("discord.js");

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: console.log,
	// SQLite only
	storage: 'database.sqlite',
});


const Tags = sequelize.define('tags', {
	suggestion: {
		type: Sequelize.TEXT,
		unique: true,
	},
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

const prefix = '!';

const fs = require('fs');
const { constants } = require('buffer');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

const util = require('minecraft-server-util');

const rconC = new util.RCON(config.ip, { port: 25575, enableSRV: true, timeout: 5000, password: config.RconPass });

//Let's
let applicationQuestions = require("./application-questions.js");
let usersApplicationStatus = [];
let appNewForm = [];
let isSettingFormUp = false;

//Botstart sequence
client.once('ready', () => {
	Tags.sync();
	console.log('The Bot is online Go start testing');
	client.user.setActivity('My prefix: **!** ', { type: "LISTENING" });
});

//Welcome messgae
client.on('guildMemberAdd', Guildmember => {
	//let SpecRole = Guildmember.guild.roles.cache.find(role => role.name === 'Member');

	//Guildmember.roles.add(SpecRole);
	Guildmember.guild.channels.cache.get('737425690877493309').send(`Welcome ${Guildmember} To Create Technical, We're excited to have you join our community. \n\n Please put your application in the Applications channel. When you recieve your Member role use !whitelist <IGN> in the Wall-of-shame channel. \n Have Fun!`);
});


//Application Functions
const applicationFormCompleted = (data) => {
	let i = 0, answers = "";

	for (; i < applicationQuestions.length; i++) {
		answers += `${applicationQuestions[i]}: ${data.answers[i]}\n`;
	}
	const ApplyChannel = client.channels.cache.get('797422520655413276')
	ApplyChannel.send(`${data.user.username} has submitted a form.\n${answers}`);
};

const sendUserApplyForm = message => {
	const user = usersApplicationStatus.find(user => user.id === message.author.id);

	if (!user) {
		message.author.send(`Application commands: \`\`\`${prefix}cancel, ${prefix}redo\`\`\``);
		message.author.send(applicationQuestions[0]);
		usersApplicationStatus.push({ id: message.author.id, currentStep: 0, answers: [], user: message.author });
	} else {
		message.author.send(applicationQuestions[user.currentStep]);
	}
};

const cancelUserApplicationForm = (message, isRedo = false) => {
	const user = usersApplicationStatus.find(user => user.id === message.author.id);

	if (user) {
		usersApplicationStatus = usersApplicationStatus.filter(el => el.id !== user.id)
		message.reply("Application canceled.");
	} else if (!isRedo) {
		message.reply("You have not started an application form yet.");
	}
};

const applicationFormSetup = (message) => {
	if (!message.guild) {
		message.reply("This command can only be used in a guild.");
		return;
	}

	if (!message.member.roles.cache.some(r => ["Devs", "Founder"].includes(r.name))) {
		message.reply("This command can only be used by an admin.");
		return;
	}

	if (isSettingFormUp) {
		message.reply("Someone else is already configuring the form.");
		return;
	}

	appNewForm = [];
	isSettingFormUp = message.author.id;

	message.author.send(`Enter questions and enter \`${prefix}endsetup\` when done.`);
};

const endApplicationFormSetup = (message) => {
	if (isSettingFormUp !== message.author.id) {
		message.reply("You are not the one setting the form up.");
		return;
	}

	isSettingFormUp = false;
	applicationQuestions = appNewForm;
};



//Commands
client.on('message', async message => {
	if (message.content.startsWith(prefix) && (message.channel.id === config.botchannel1 || message.channel.id === config.botchannel2 || message.channel.id === config.botchannel3 || message.channel.id === 797201201527259181)) {
		const input = message.content.slice(prefix.length).trim().split(' ');
		const command = input.shift().toLowerCase();
		const commandArgs = input.join(' ');
		const NoCommand = new MessageEmbed();
		const user = message.author;


		if (command == 'ping') {
			client.commands.get('ping').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'pong') {
			client.commands.get('pong').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'invite') {
			client.commands.get('invite').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command === 'suggest') {
			client.commands.get('suggest').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'tag') {
			client.commands.get('tag').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'trade') {
			client.commands.get('trade').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command === 'taginfo') {
			client.commands.get('taginfo').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command === 'showtags') {
			return
		} else if (command === 'removetag') {
			client.commands.get('removetag').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'help') {
			client.commands.get('help').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'shame') {
			client.commands.get('shame').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client);
		} else if (command == 'reactionrole') {
			client.commands.get('reactionrole').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'list') {
			client.commands.get('list').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconC)
		} else if (command == 'whitelist') {
			client.commands.get('whitelist').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconC)
		} else if (command == 'status') {
			client.commands.get('status').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config)
		} else if (command == 'stop') {
			client.commands.get('stop').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config)
		} else if (command == 'run') {
			if (message.member.roles.cache.some(r => ["Dev", "Founder"].includes(r.name))) {
				client.commands.get('run').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconC)
				console.log(`${user} has the permissions`)
			} else {
				message.channel.send('You dont have the permissions to run this command.')
			}
		} else if (command == 'apply') {
			sendUserApplyForm(message);
			message.channel.send(`Check your DM's. No DM? check if you allow DM's from the CreateTechnical Server or Message a Dev`)
		} else if (command == 'cancel') {
			cancelUserApplicationForm(message);
		} else if (command == 'redo') {
			cancelUserApplicationForm(message, true);
			sendUserApplyForm(message);
		} else if (command == 'setup') {
			applicationFormSetup(message);
		} else if (command == 'endsetup') {
			endApplicationFormSetup(message);
		} else {
			NoCommand.setTitle('Command not found.');
			NoCommand.addField(`The Command, ${command}, is not in use by this bot.`, `Think the command should be used? DM Hyperbuilder`)
			message.channel.send({ embed: NoCommand });
		}
	} else {
		if (message.channel.type === "dm") {
			if (message.author.id === isSettingFormUp) {
				appNewForm.push(message.content);
			} else {
				const user = usersApplicationStatus.find(user => user.id === message.author.id);

				if (user && message.content) {
					user.answers.push(message.content);
					user.currentStep++;

					if (user.currentStep >= applicationQuestions.length) {
						applicationFormCompleted(user);
						message.author.send("Congratulations your application has been sent!");
					} else {
						message.author.send(applicationQuestions[user.currentStep]);
					}
				}
			}
		}
	}
});


client.login(config.token);

/* dump

// equivalent to: SELECT name FROM tags;
const tagList = await Tags.findAll({ attributes: ['name'] });
const tagString = tagList.map(t => t.suggestion).join(', ') || 'No tags set.';
return message.channel.send(`List of tags: ${tagString}`);


*/