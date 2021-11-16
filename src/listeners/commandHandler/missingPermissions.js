const { Listener } = require('discord-akairo');

class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }
    async exec(message, command, type, missing) {
        if (type == 'client') {
            return await message.channel.send(`Je n'ai les permissions requises (\`${missing}\`) pour effectuer votre demande.`)
        } else {
            return await message.channel.send(`Vous n'avez pas les permissions requises (\`${missing}\`) pour utiliser la commande ${command.id}`)
        }
    }
}

module.exports = MissingPermissionsListener;

