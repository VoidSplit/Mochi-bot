const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban']
        });
    }
    exec(message) {
        return message.reply('Pong');
    }
}

module.exports = BanCommand;