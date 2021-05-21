const { WebhookClient } = require("discord.js")
const config = require("../config.json")

module.exports = new WebhookClient('845377586020089889', config.errtoken)