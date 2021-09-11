const { Command } = require('discord-akairo');

class DuelCommand extends Command {
    constructor() {
        super('duel', {
            aliases: ['duel', 'defi'],
            userPermissions: 'KICK_MEMBERS',
            cooldown: 5000,
            channel: 'guild',
            args: [
                { id: 'user', type: 'memberMention', default: '' },
                { id: 'langage', type: 'text', default: 'any languages' }
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
                    .setFooter(`${args.langage} - Le défi se termine dans: 30min`)
                    .setColor('#35db61')
                    .addFields(
                        {name: '\u200b', value: '<:check:885934497143591023>** : Accepter**', inline: true},
                        {name: '\u200b', value: '<:cancel:885934496967450664>** : Refuser**', inline: true},
                        {name: '\u200b', value: '<:plus:885937246493089842>** : En savoir plus**', inline: true},
                    )
            ]}),
            message.channel.send(`${args.user} acceptez-vous ce défi de la part de ${message.author} ?`)
                .then(function (message) {
                    message.react("885934497143591023")
                    message.react("885934496967450664")
                    message.react("885937246493089842")
                }).catch(function() {
                    console.log(`Erreur dans le fichier commande duel`);
                });
        }
    }
}

module.exports = DuelCommand;