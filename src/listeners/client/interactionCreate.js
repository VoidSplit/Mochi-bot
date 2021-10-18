const { Listener } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class InteractionCreate extends Listener {
    constructor() {
        super('InteractionCreate', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }
    exec(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    }
}

module.exports = InteractionCreate;