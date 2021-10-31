require('module-alias/register')
const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const config = require('./config.json');
const error = require("@util/error.js");
const readLastLines = require('read-last-lines');
const log = require("@util/log.js")

var logBackup = console.log;

console.log = function () {
    logBackup.apply(console, arguments);
    readLastLines.read('./log.txt', 1)
        .then((lines) => log.send(lines));
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

process.on("unhandledRejection", (e) => error.send("UnhandledRejection: " + e.stack ?? e, { files: ["./log.txt"] }))
process.on("uncaughtException", (e, o) => error.send("UnhandledRejection: " + (e.stack ?? e) + "\n" + o))

client.login(config.token)