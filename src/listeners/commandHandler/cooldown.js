const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }
    async exec(message, command, remaining) {
        message.channel.send(`Il vous reste \`${Math.round(remaining / 1000)}s\` avant de pouvoir utiliser cette commande.`)
    }
}

module.exports = CooldownListener;