module.exports = {
    name: 'up',
    description: "this is a ping command!",
    async execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, config, rcon) {

        async function main() {
            rcon.on("connect", () => console.log("connected"))
            rcon.on("authenticated", () => console.log("authenticated"))
            rcon.on("end", () => console.log("end"))

            await rcon.connect()

            console.log(await rcon.send("/list"))

            await Promise.all([...Array(10)].map((_, i) => rcon.send(`/say ${i}`)))

            rcon.end()
        }

        main().catch(console.error)
    }
}