const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }
    exec(member) {
        console.log(`${member.user.username} à rejoint LDDD.`);
    }
}

module.exports = GuildMemberAddListener;