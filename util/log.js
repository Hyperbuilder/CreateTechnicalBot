const { WebhookClient } = require("discord.js")
const config = require("@root/config.json")

module.exports = new WebhookClient('862421681721049125', config.logtoken)