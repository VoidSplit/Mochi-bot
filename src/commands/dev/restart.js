const { Command } = require('discord-akairo');

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart', 'rs'],
            category: 'dev',
            ownerOnly: true,
            description: {
                content: 'La commande restart relance le bot.',
                usage: 'restart',
                exemples: ['restart']
            }
        });
    }
    exec(message) {
        require('child_process').execSync('pm2 restart 0');
    }
}

module.exports = RestartCommand;