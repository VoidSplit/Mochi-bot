const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'info'],
            category: 'misc',
            userPermissions: 'KICK_MEMBERS',
            ratelimit: 2,
            cooldown: 5000,
            ownerOnly: false,
            channel: 'guild',
            description: {
                content: 'La commande userinfo renvoie des informations sur l\'utilisateur !',
                usage: 'userinfo <@user>',
                exemples: ['userinfo @user']
            },
            args: [ { id: 'member', type: 'member', default: message => message.member } ]
        });
    }
    exec(message, args) {
        const guildMember = args.member;
        return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setColor("#4287f5")
                .setThumbnail(guildMember.user.displayAvatarURL())
                .addFields(
                    { name: '**► ID:**', value: guildMember.id, inline: true },
                    { name: '**► Tag:**', value: `${guildMember.user.username}#${guildMember.user.discriminator}`, inline: true },
                    { name: '**► Nickname:**', value: `${guildMember.nickname}`, inline: true },
                    { name: '**► Created account:**', value: `${guildMember.user.createdAt.getUTCDay()}/${guildMember.user.createdAt.getUTCMonth()}/${guildMember.user.createdAt.getUTCFullYear()} à ${guildMember.user.createdAt.getUTCHours()}:${guildMember.user.createdAt.getUTCMinutes()}`, inline: true },
                    { name: '**► Join:**', value: `${guildMember.joinedAt.getUTCDay()}/${guildMember.joinedAt.getUTCMonth()}/${guildMember.joinedAt.getUTCFullYear()} à ${guildMember.joinedAt.getUTCHours()}:${guildMember.joinedAt.getUTCMinutes()}`, inline: true },
                    { name: '**► Bot:**', value: `${guildMember.user.bot}`, inline: true },
                    { name: '**► Roles:**', value: `${guildMember.roles.cache.map(role => role.name).join(', ')}`, inline: false }
                )
                .setTimestamp()
        ] });
    }
}

module.exports = UserInfoCommand;





