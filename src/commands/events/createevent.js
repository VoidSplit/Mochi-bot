const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageCollector } = require('discord.js');

class CreateEventCommand extends Command {
    constructor() {
        super('createevent', {
            aliases: ['createevent', 'eventadd', 'event'],
            userPermissions: 'KICK_MEMBERS',
            category: 'events',
            cooldown: 5000,
            description: {
                content: 'La commande createevent crée un évenement sur le serveur !',
                usage: 'createevent',
                exemples: ['createevent']
            }
        });
    }
    async exec(message) {
        const selfilter = i => i.customId === 'categorySelector' || i.customId === 'tnSelector' || i.customId === 'vnSelector';
        const filter = m => m.author.id === message.author.id;
        const selcollector = message.channel.createMessageComponentCollector({ selfilter, time: 15000 });
        let category = [];
        let tn = [];
        let vn = [];
        let tc = [];
        let vc = [];
        let en = [];

        const categorySel = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('categorySelector')
				.setPlaceholder('Nothing selected')
                .addOptions(
                    this.client.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").map((cat) => {
                        return {
                            label: cat.name,
                            value: cat.name
                        }
                    })
                )
		);
        const textNumberSel = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('tnSelector')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: "0",
                        value: "0"
                    },
                    {
                        label: "1",
                        value: "1"
                    },
                    {
                        label: "2",
                        value: "2"
                    },
                    {
                        label: "3",
                        value: "3"
                    },
                    {
                        label: "4",
                        value: "4"
                    },
                    {
                        label: "5",
                        value: "5"
                    },
                    {
                        label: "6",
                        value: "6"
                    },
                    {
                        label: "7",
                        value: "7"
                    },
                    {
                        label: "8",
                        value: "8"
                    },
                    {
                        label: "9",
                        value: "9"
                    },
                    {
                        label: "10",
                        value: "10"
                    }
            ])
        );
        const voiceNumberSel = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('vnSelector')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: "0",
                        value: "0"
                    },
                    {
                        label: "1",
                        value: "1"
                    },
                    {
                        label: "2",
                        value: "2"
                    },
                    {
                        label: "3",
                        value: "3"
                    },
                    {
                        label: "4",
                        value: "4"
                    },
                    {
                        label: "5",
                        value: "5"
                    },
                    {
                        label: "6",
                        value: "6"
                    },
                    {
                        label: "7",
                        value: "7"
                    },
                    {
                        label: "8",
                        value: "8"
                    },
                    {
                        label: "9",
                        value: "9"
                    },
                    {
                        label: "10",
                        value: "10"
                    }
            ])
        );

        await message.channel.send(`**Veuillez indiquer le nom de l'événement**`);
        await message.channel.awaitMessages({filter, max: 1, time: 10000 }).then((collected) => {
            const name = collected.first();
            en.push(name);
        }).catch((err) => console.log(err));

        await message.channel.send({content: '**Veuillez choisir une catégorie**', ephemeral: true, components: [categorySel]});

        selcollector.on('collect', async interaction => {
            if (!interaction.isSelectMenu()) return;
            if (interaction.customId === 'categorySelector') {
                category.push(interaction.values[0]);
                let embed = new MessageEmbed()
                    .setTitle(`Create Event`)
                    .setDescription(`**Name**: \n\`\`\`${en[0]}\`\`\`\n**Category**: \n\`\`\`${category[0]}\`\`\``)
                    .setColor('#f2ff58')
                    .addFields(
                        { name: 'Text Channels', value: `\`\`\`  \`\`\``, inline: true},
                        { name: 'Voice Channels', value: `\`\`\`  \`\`\``, inline: true }
                    )
                    .setTimestamp()
                await interaction.update({ embeds: [embed], content: '**Veuillez choisir le nombre de salons textuels que vous voulez créer**', ephemeral: true, components: [textNumberSel] });
            }
            if (interaction.customId === 'tnSelector') {
                tn.push(interaction.values[0]);
                await interaction.update({ content: '**Veuillez choisir le nombre de salons vocaux que vous voulez créer**', ephemeral: true, components: [voiceNumberSel] });
            }
            if (interaction.customId === 'vnSelector') {
                vn.push(interaction.values[0]);

                await interaction.update({ embeds: null, content: null, ephemeral: true, components: [] });
                for(let i = 0; i<tn ;i++) {
                    await message.channel.send(`**Veuillez choisir le nom du salon textuel n°${i+1}**`);
                    await message.channel.awaitMessages({filter, max: 1, time: 10000 }).then((collected) => {
                        const msg = collected.first();
                        tc.push(msg);
                    }).catch((err) => console.log(err));
                }
                let tcembed = new MessageEmbed()
                    .setTitle(`Create Event`)
                    .setDescription(`**Name**: \n\`\`\`${en[0]}\`\`\`\n**Category**: \n\`\`\`${category[0]}\`\`\``)
                    .setColor('#f2ff58')
                    .addFields(
                        { name: 'Text Channels', value: `\`\`\`${tc.join( '\n')}\`\`\``, inline: true},
                        { name: 'Voice Channels', value: `\`\`\`  \`\`\``, inline: true }
                    )
                    .setTimestamp()
                message.channel.send({ embeds: [tcembed] });



                for(let i = 0; i<vn ;i++) {
                    await message.channel.send(`**Veuillez choisir le nom du vocal textuel n°${i+1}**`);
                    await message.channel.awaitMessages({filter, max: 1, time: 10000 }).then((collected) => {
                        const msg = collected.first();
                        vc.push(msg);
                    }).catch((err) => console.log(err));
                }
                let vcembed = new MessageEmbed()
                    .setTitle(`Create Event`)
                    .setDescription(`**Name**: \n\`\`\`${en[0]}\`\`\`\n**Category**: \n\`\`\`${category[0]}\`\`\``)
                    .setColor('#f2ff58')
                    .addFields(
                        { name: 'Text Channels', value: `\`\`\`${tc.join( '\n')}\`\`\``, inline: true},
                        { name: 'Voice Channels', value: `\`\`\`${vc.join( '\n')}\`\`\``, inline: true }
                    )
                    .setTimestamp()
                const buttons = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('accept')
                            .setLabel('Créer')
                            .setStyle('SUCCESS')
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId('decline')
                            .setLabel('Annuler')
                            .setStyle('DANGER')
                    )
                console.log(vc);
                console.log(tc);
                message.channel.send({ embeds: [vcembed], content: '**Êtes-vous sûr de vouloir créer cet évenement ?**', components: [buttons] });
            }
        });


    }
}

module.exports = CreateEventCommand;

/*

!createevent 
(EMBED)
Veuillez choisir une catégorie 

[ ••• ]

(EMBED)
Veuillez choisir le nombre de salons textuels que vous voulez créer 

[ ••• ]

for i (

Veuillez choisir le nom du salon textuel n°i

)
(EMBED)
for i (

Voulez vous que les gens puissent écrire dans ce salon ?

)
(EMBED)
Veuillez choisir le nombre de salons vocaux que vous voulez créer [ ••• ]
for i (

Veuillez choisir le nom du salon vocal n°i

)
(EMBED)
for i (

Voulez vous que les gens puissent se connecter dans ce salon ?

)

(EMBED)
Êtes vous sûr de vouloir créer cet événement ?
{ Créer }{ Annuler }


[ ••• ] = select
{ text } = button
(EMBED) = embed

*/