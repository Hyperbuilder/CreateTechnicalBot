module.exports = {
	name: 'apply',
	description: "this is a apply command!",
	async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, sendUserApplyForm) {
		const memberEmoji = '🔵';
		const Applychannel = client.channels.cache.get('815597271165042688')

		let embed = new Discord.MessageEmbed()
			.setTitle('Start Applications')
			.setDescription('Create a Applicationform to fill in.\n\n' + `${memberEmoji} To Apply!\n`);


		let Applymessage = await Applychannel.send(embed).then(messageEmbed.react(memberEmoji));


		client.on('messageReactionAdd', async (reaction, user, message) => {
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;

			if (reaction.emoji.name === memberEmoji) {
				await reaction.message.guild.members.cache.get(user.id).sendUserApplyForm(message)

			} else {
				return;
			}
		})
	}
}
