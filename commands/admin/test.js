module.exports = {
    name: 'test',
    description: "this is an uptime command!",
    expArgs: "<none>",
    help: "Command to get node process data",
    permission: "ADMINISTRATOR",
    execute(client, message, args, Discord) {
        function getUptime() {
            var uptime = process.uptime();
            console.log("Uptime raw:", uptime)
            const date = new Date(uptime * 1000);
            const days = date.getUTCDate() - 1,
                hours = date.getUTCHours(),
                minutes = date.getUTCMinutes(),
                seconds = date.getUTCSeconds(),
                milliseconds = date.getUTCMilliseconds();


            let segments = [];

            // Format the uptime string. 	
            if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
            if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
            if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
            if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
            if (milliseconds > 0) segments.push(milliseconds + ' millisecond' + ((seconds == 1) ? '' : 's'));
            const dateString = segments.join(', ');

            console.log("Uptime: " + dateString);
            message.channel.send(`Bot Uptime: ${dateString}\nRaw Uptime: ${uptime}`)
        }

    }
}