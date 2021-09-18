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
                { id: 'user', type: 'member', default: '' }
            ]
        });
    }
    exec(message, args) {
        console.log(args.user)
        return message.channel.send(`\`\`\`${args.user} : ${args.user.user.username}\`\`\``)
        /*
        return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setColor("#4287f5")
                .setThumbnail(args.user.avatarURL())
                .addFields(
                    { name: '**► ID:**', value: args.user.id, inline: true },
                    { name: '**► Tag:**', value: `${args.user.username}#${args.user.discriminator}`, inline: true },
                    { name: '**► Nickname:**', value: `${args.user.client.nickname}`, inline: true },
                    { name: '**► Created account:**', value: `${args.user.createdAt}`, inline: true },
                    { name: '**► Join:**', value: `?`, inline: true },
                    { name: '**► Bot:**', value: `${args.user.bot}`, inline: true }
                )
                .setTimestamp()
        ] });*/
    }
}

module.exports = UserInfoCommand;





