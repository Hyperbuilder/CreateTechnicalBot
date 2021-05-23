module.exports = {
	name: 'shame',
	description: "this makes the bot say pong",
	expArgs: "<User to shame>",
	help: "Shame a user for doing something bad",
	permission: "READ_MESSAGE_HISTORY",
	execute(client, message, args, Discord) {
		const MNF = new Discord.MessageEmbed();
		const Shame = new Discord.MessageEmbed();


		const Target = message.mentions.users.first();
		if (Target) {
			Shame.setTitle('Shame on you!')
			Shame.addField(`Shame them for what they've done!`, `Shame on you ${Target}`)
			message.channel.send({ embed: Shame });
		} else {
			MNF.setTitle('Shame on you!')
			MNF.addField(`Shame, you misspelled the name!`, `Try again!`)
			message.channel.send({ embed: MNF });
		}

	}
}