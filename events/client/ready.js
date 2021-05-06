const mongo = require("../../mongo")
const actions = require("../../actions")
const chalk = require('chalk');

const error = chalk.black.bgRedBright;
const warning = chalk.keyword('orange');
const log = chalk.blueBright;
const info = chalk.cyanBright;
const success = chalk.keyword('lime');


module.exports = async (Discord, client) => {
    console.log(success(`\nCT Test + Gamble bot is running`));

    await mongo().then(mongoose => {
        try {
            console.log(info(`Connected to MongoDB`))
        } finally {
            mongoose.connection.close()
        }
    })

    client.user.setActivity("Create Technical Discord", { type: 'WATCHING' })
}