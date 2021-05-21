module.exports = {
    name: 'suggest',
    description: "Make a Suggestion",
    async execute(client, message, Discord) {
        message.channel.send(`Hello ${message.author} \nDue to the bot being rewritten is our suggestionssystem down till the new system takes its place. Greetings Hyper!`)
    }
}