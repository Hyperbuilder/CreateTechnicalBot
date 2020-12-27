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

const SourceRCONClient = require('source-rcon-client').default, rconS = new SourceRCONClient(config.ip, 25575, config.RconPass);
const rconC = new SourceRCONClient(config.ip, 25585, config.RconPass)

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




//Commands
client.on('message', async message => {
	if (message.content.startsWith(prefix) && (message.channel.id === config.botchannel1 || message.channel.id === config.botchannel2 || message.channel.id === config.botchannel3)) {
		const input = message.content.slice(prefix.length).trim().split(' ');
		const command = input.shift().toLowerCase();
		const commandArgs = input.join(' ');
		const NoCommand = new MessageEmbed();

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
			client.commands.get('help').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'help') {
			client.commands.get('help').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'shame') {
			client.commands.get('shame').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client);
		} else if (command == 'reactionrole') {
			client.commands.get('reactionrole').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'list') {
			client.commands.get('list').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconS, rconC)
		} else if (command == 'whitelist') {
			client.commands.get('whitelist').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rconS, rconC)
		} else {
			NoCommand.setTitle('Command not found.');
			NoCommand.addField(`The Command, ${command}, is not in use by this bot.`, `Think the command should be used? DM Hyperbuilder`)
			message.channel.send({ embed: NoCommand });
		}
	}
	// Put "else if (command === '//command')" after the curly bracket above
});




client.login(config.token);

/* dump

// equivalent to: SELECT name FROM tags;
const tagList = await Tags.findAll({ attributes: ['name'] });
const tagString = tagList.map(t => t.suggestion).join(', ') || 'No tags set.';
return message.channel.send(`List of tags: ${tagString}`);


*/