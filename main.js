const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const config = require('./config.json');
const error = require("./utils/error");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

process.on("unhandledRejection", (e) => error.send("UnhandledRejection: " + e.stack ?? e))
process.on("uncaughtException", (e, o) => error.send("UnhandledRejection: " + (e.stack ?? e) + "\n" + o))

client.login(config.token)