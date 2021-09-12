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
    exec(message) {
        return message.reply('Pong');
    }
}

module.exports = PingCommand;