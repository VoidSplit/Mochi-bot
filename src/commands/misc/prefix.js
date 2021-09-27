const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            category: 'misc',
            userPermissions: 'KICK_MEMBERS',
            ratelimit: 2,
            cooldown: 5000,
            channel: 'guild',
            description: {
                content: 'La commande prefix change le prefix du serveur',
                usage: 'prefix <nemPrefix>',
                exemples: ['prefix', 'prefix !']
            },
            args: [
                { id: 'newPrefix', type: 'string' }
            ]
        });
    }
    async exec(message, args) {
        if(!args.newPrefix) return message.channel.send(`Prefix actuel: ${await this.handler.prefix(message)}`);
        await this.client.guildSettings.update(message.guild, { prefix: args.newPrefix });
        return message.channel.send(`Le prefix du serveur est maintenant: \`${args.newPrefix}\``);
    }
}

module.exports = PrefixCommand;





