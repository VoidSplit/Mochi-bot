const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            userPermissions: 'KICK_MEMBERS',
            cooldown: 5000,
            category: 'mods',
            channel: 'guild',
            description: {
                content: 'La commande ban ban un utilisateur',
                usage: 'ban [@user] <raison>',
                exemples: ['ban @user parle mal']
            },
            args: [
                { id: 'user', type: 'memberMention', default: '' },
                { id: 'raison', match:"content" }
            ]
        });
    }
    exec(message, args) {
        if(args.user == '') return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setTitle(`Veuillez mentionner une personne !`)
        ]})
        if(args.user != '') {
            args.user.ban('test');
            return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setColor('#fcba03')
                .setAuthor(`${args.user.user.username}#${args.user.user.discriminator} (${args.user.user.id})`, args.user.user.displayAvatarURL())
                .setDescription(`**Action**: ban\n**Raison**:${args.raison.slice(22)}`)
                .setTimestamp()
                .setFooter(`${message.author.username}`)
            ]})
        }
    }
}

module.exports = BanCommand;