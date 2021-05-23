const error = require("../../Utils/error.js")

module.exports = {
    name: 'restart',
    description: "this is a Restart command!",
    expArgs: "<none>",
    help: "Command to restart the node process",
    permission: 'ADMINISTRATOR',
    execute(client, message, args, Discord) {
        const BotOwner = message.author.id === '432217612345278476';
        if (!BotOwner) {
            message.channel.send('https://tenor.com/8pOE.gif')
        } else {
            message.channel.send('Restarting...').then(m => {
                error.send("Restarting Bot")
                var spawn = require('child_process').spawn;

                (function main() {

                    if (process.env.process_restarting) {
                        delete process.env.process_restarting;
                        // Give old process one second to shut down before continuing ...
                        setTimeout(main, 1000);
                        return;
                    }

                    // ...

                    // Restart process ...
                    spawn(process.argv[0], process.argv.slice(1), {
                        env: { process_restarting: 1 },
                        stdio: 'ignore'
                    }).unref();
                })();
            });
        }
    }
}
