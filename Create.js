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
	Guildmember.guild.channels.cache.get('737425690877493309').send(`Welcome <@${Guildmember}> To Create Technical, where there's no point starting now because the world will be reset soon™️!`);
});




//Commands
client.on('message', async message => {
	if (message.content.startsWith(prefix) && (message.channel.id === '737774702877212724' || message.channel.id === '736160832790200340')) {
		const input = message.content.slice(prefix.length).trim().split(' ');
		const command = input.shift().toLowerCase();
		const commandArgs = input.join(' ');

		if (command == 'ping') {
			client.commands.get('ping').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
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

		} else if (command === 'removetag') {
			client.commands.get('help').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'help') {
			client.commands.get('help').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
		} else if (command == 'shame') {
			client.commands.get('shame').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client);
		} else if (command == 'reactionrole') {
			client.commands.get('reactionrole').execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client)
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