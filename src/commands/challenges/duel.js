const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

class DuelCommand extends Command {
    constructor() {
        super('duel', {
            aliases: ['duel', 'defi'],
            userPermissions: 'KICK_MEMBERS',
            category: 'challenges',
            cooldown: 5000,
            channel: 'guild',
            description: {
                content: 'La commande duel lance un duel avec un autre utilisateur, et prend au hasard un défi plus au moins dur dans la catégorie choisie',
                usage: 'duel [@user] <langage>',
                exemples: ['duel @user python', 'defi @user']
            },
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
            const row = new MessageActionRow()
			    .addComponents(
			    	new MessageButton()
			    		.setCustomId('accept')
			    		.setLabel('Accepter')
			    		.setStyle('SUCCESS')
			    )
                .addComponents(
			    	new MessageButton()
			    		.setCustomId('decline')
			    		.setLabel('Refuser')
			    		.setStyle('DANGER')
			    )
                .addComponents(
			    	new MessageButton()
			    		.setCustomId('infos')
			    		.setLabel('Plus d\'infos')
			    		.setStyle('PRIMARY')
			    );
            const rowClicked = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('infos')
                        .setLabel('Plus d\'infos')
                        .setStyle('PRIMARY')
                );
            const embed = new MessageEmbed()
                .setTitle(`${message.author.username} a lancé un défi à ${args.user.displayName}`)
                .setDescription(`**Défi**: Ceci est le défi`)
                .setThumbnail(args.user.user.displayAvatarURL())
                .setFooter(`${args.langage} - Le défi se termine dans: 30min`)
                .setColor('#35db61');
            message.channel.send({ embeds: [embed], components: [row]});




            const filter = i => i.customId === 'infos' || i.customId === 'decline' || i.customId === 'accept';
            const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'infos') {
                    await i.update({ components: [rowClicked] });
                }
                if (i.customId === 'decline') {
                    await i.update({ components: [rowClicked] });
                }
                if (i.customId === 'accept') {
                    await i.update({ components: [rowClicked] });
                }
            });
            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        }
    }
}

module.exports = DuelCommand;