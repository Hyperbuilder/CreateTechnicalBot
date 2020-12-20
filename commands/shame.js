module.exports = {
	name: 'shame',
	description: "this makes the bot say pong",
	execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {

		const Target = message.mentions.users.first();
		if (Target) {
			message.channel.send(`Shame on you ${Target}`);
		} else {
			Message.channel.send('Member not found');
		}

	}
}