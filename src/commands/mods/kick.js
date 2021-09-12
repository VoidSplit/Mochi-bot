const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            userPermissions: 'KICK_MEMBERS',
            cooldown: 5000,
            channel: 'guild',
            category: 'mods',
            description: {
                content: 'La commande kick kick un utilisateur',
                usage: 'kick [@user] <raison>',
                exemples: ['kick @user parle mal']
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
            args.user.kick('test');
            return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setColor('#fcba03')
                .setAuthor(`${args.user.user.username}#${args.user.user.discriminator} (${args.user.user.id})`, args.user.user.displayAvatarURL())
                .setDescription(`**Action**: kick\n**Raison**:${args.raison.slice(22)}`)
                .setTimestamp()
                .setFooter(`${message.author.username}`)
            ]})
        }
    }
}

module.exports = KickCommand;