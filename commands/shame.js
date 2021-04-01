module.exports = {
	name: 'shame',
	description: "this makes the bot say pong",
	execute(client, message, args, Discord) {
		const MNF = new MessageEmbed();
		const Shame = new MessageEmbed();


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