const { Command } = require('discord-akairo');

class DuelCommand extends Command {
    constructor() {
        super('duel', {
            aliases: ['duel', 'defi'],
            userPermissions: 'KICK_MEMBERS',
            cooldown: 5000,
            channel: 'guild',
            args: [
                { id: 'user', type: 'memberMention', default: '' }
            ]
        });
    }
    exec(message, args) {
        if(args.user == '') return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setTitle(`Veuillez mentionner une personne !`)
        ]})
        if(args.user != '') {
            return  message.channel.send({ embeds: [
                this.client.functions.embed()
                    .setTitle(`${message.author.username} a lancé un défi à ${args.user.displayName}`)
                    .setDescription(`**Défi**: Ceci est le défi`)
                    .setThumbnail(args.user.user.displayAvatarURL())
                    .setFooter(`Le défi se termine dans: 30min`)
            ]}),
            message.channel.send(`${args.user} acceptez-vous ce défi de la part de ${message.author} ?`)
                .then(function (message) {
                    message.react("✔️")
                    message.react("❌")
                    message.react("🔖")
                }).catch(function() {
                    console.log(`Erreur dans le fichier commande duel`);
                });
        }
    }
}

module.exports = DuelCommand;