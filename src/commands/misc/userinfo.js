const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'info'],
            //description: 'Affiche les information de l\'utilisateur'
            // ignoreCooldown: '382945750872752146',
            // ignorePermissions: '382945750872752146',
            userPermissions: 'KICK_MEMBERS',
            ratelimit: 2,
            cooldown: 5000,
            //typing: true,
            ownerOnly: true,
            channel: 'guild',
            args: [
                { id: 'firstArgs', match: 'content' }
            ],
            separator: '|'
        });
    }
    exec(message, args) {
        return message.reply(`arg1s ${args.firstArgs}`);
    }
}

module.exports = UserInfoCommand;