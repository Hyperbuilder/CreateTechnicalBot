module.exports = {
	name: 'apply',
	description: "this is a apply command!",
	async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client) {
		const memberEmoji = '🔵';
		const Applychannel = client.channels.cache.get('815597271165042688')
		const sendUserApplyForm = require('../Create.js')
		let embed = new Discord.MessageEmbed()
			.setTitle('Start Applications')
			.setDescription('Create a Applicationform to fill in.\n\n' + `${memberEmoji} To Apply!\n`);


		let Applymessage = await Applychannel.send(embed)
		Applymessage.react(memberEmoji);


		client.on('messageReactionAdd', async (reaction, user, message) => {
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;

			if (reaction.emoji.name === memberEmoji) {
				await sendUserApplyForm(message)

			} else {
				return;
			}
		})
	}
}
