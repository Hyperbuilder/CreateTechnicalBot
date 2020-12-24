module.exports = {
    name: 'up',
    description: "this is a ping command!",
    execute(message, commandArgs, command, Tags, MessageEmbed, Discord, client, rconSurvival, rconCreative) {
        rconSurvival.exec('status', function(res) {
            console.log('Survivalserver status:', res.body)
            message.channel.send('Survivalserver status:', res.body )
        })
        setTimeout( 
        rconCreative.exec('status', function(res) {
            console.log('Creativeserver status:', res.body)
            message.channel.send('Creativeserver status:', res.body )
        }), 5000)












        //if (Math.random() < 0.05) {
        //    message.channel.send('\*\*YES\*\*')
        //   setTimeout(() => {
        //        message.channel.send('\*\*JK no ofc not\*\*')
        //    }, 5000)
        //} else {message.channel.send('\*\*NO\*\*')}
    }
}