const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'info'],
            category: 'misc',
            userPermissions: 'KICK_MEMBERS',
            ratelimit: 2,
            cooldown: 5000,
            ownerOnly: true,
            channel: 'guild',
            description: {
                content: 'La commande userinfo renvoie des informations sur l\'utilisateur !',
                usage: 'userinfo <@user>',
                exemples: ['userinfo @user']
            },
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