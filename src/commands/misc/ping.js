const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'misc',
            description: {
                content: 'La commande ping renvoie la latence du bot !',
                usage: 'ping',
                exemples: ['ping']
            }
        });
    }
    async exec(message) {
        const sentMessage = await message.channel.send('Pong !  🏓');
        const timeStamp = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp;
        const botLatency = `${'```'}\n ${Math.round(sentMessage.createdTimestamp - timeStamp)}ms  ${'```'}`;
        const apiLatency = `${'```'}\n ${Math.round(message.client.ws.ping)}ms  ${'```'}`;

        const embed = this.client.functions.embed()
            .setTitle('Pong !  🏓')
            .addField('Bot Latency', botLatency, true)
            .addField('API Latency', apiLatency, true)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#42d6ff')
            .setTimestamp();

        await sentMessage.edit({
            content: null,
            embeds: [embed]
        })
    }
}

module.exports = PingCommand;