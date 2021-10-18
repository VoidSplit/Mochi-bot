const { Listener } = require('discord-akairo');
const { User } = require('../../structures/Models');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }
    async exec(member) {
        await User.create({
                id: member.user.id,
                pseudo: member.user.tag,
                experience: 0,
                level: 0,
                glory: 0,
                challenge: 0,
                id_challenge: null
            }, err => {
            if (err) return console.log("Erreur !")
        })
        const logChannel = this.client.channels.cache.get('899571920163459093')

        const embed = this.client.functions.embed()
            .setTitle("New member !")
            .setDescription(`**User :** ${member.user.tag}\n**Created account :** ${member.user.createdAt.getUTCDay()}/${member.user.createdAt.getUTCMonth()}/${member.user.createdAt.getUTCFullYear()} à ${member.user.createdAt.getUTCHours()}:${member.user.createdAt.getUTCMinutes()}\n**Joined server :** ${member.joinedAt.getUTCDay()}/${member.joinedAt.getUTCMonth()}/${member.joinedAt.getUTCFullYear()} à ${member.joinedAt.getUTCHours()}:${member.joinedAt.getUTCMinutes()}`)
            .setThumbnail(`${member.user.displayAvatarURL(true)}`)
            .setFooter(`Membres: ${member.guild.memberCount.toLocaleString()}`)
            .setColor('#42d6ff')
        await logChannel.send({embeds: [embed] })
            .then(() => console.log(`${member.user.tag} à rejoint LDDD.`))
            .catch(() => console.log("guildMemberAdd -> message non envoyé"))
    }
}

module.exports = GuildMemberAddListener;