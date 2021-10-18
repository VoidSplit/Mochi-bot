const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const MochiClient = require('../../structures/MochiClient');
const wait = require('util').promisify(setTimeout);

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
                { id: 'langage', type: 'text' }
            ]
        });
    }
    exec(message, args) {
        //! Si aucun utilisateur n'est mentionné
        if(args.user == '') return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setTitle(`Veuillez mentionner une personne !`)
        ]})

        //! Si un utilisateur est mentionné
        if(args.user != '') {

            /*
            ! Définition des variables
            * languages = liste des langages choisis (array)
            * themes = thème choisi (array)
            */

            let languages = [];
            let theme = [];

            //! Définition des menus déroulants
            const langageSel = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('langageSelector')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(5)
					.addOptions([
						{
							label: 'any languages',
							value: 'any-languages',
						},
						{
							label: 'python',
							value: 'python',
						},
						{
							label: 'php',
							value: 'php',
						},
						{
							label: 'javascript',
							value: 'javascript',
						},
						{
							label: 'css',
							value: 'css',
						},
						{
							label: 'c',
							value: 'c',
						},
						{
							label: 'c#',
							value: 'c#',
						},
						{
							label: 'c++',
							value: 'c++',
						},
						{
							label: 'java',
							value: 'java',
						},
						{
							label: 'rust',
							value: 'rust',
						},
						{
							label: 'scratch',
							value: 'scratch',
						},
						{
							label: 'lua',
							value: 'lua',
						}
					])
			);

            const themeSel = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('themeSelector')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'jeu',
							value: 'jeu',
						},
                        {
                            label: 'logiciel',
                            value: 'logiciel'
                        },
                        {
                            label: 'site',
                            value: 'site'
                        }
					])
			);

            //! Définition des boutons non cliqués
            const buttons = new MessageActionRow()
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

            //! Définition des boutons cliqués
            const buttonsClicked = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('infos')
                        .setLabel('Plus d\'infos')
                        .setStyle('PRIMARY')
                );

            //? Envoi du premier menu (langage de programmation)
            message.channel.send({content: '**Choisissez le language de programmation**', ephemeral: true, components: [langageSel]});







            /*
            //! Si une interaction a été detecté
            this.client.on('interactionCreate', async interaction => {

                //! Si l'interaction n'est pas un menu déroulant alors on ne retourne rien
                if (!interaction.isSelectMenu()) return;

                //! Sinon si l'id de l'interaction est langageSelector
                if (interaction.customId === 'langageSelector') {

                    //! Alors on récupère tout les langages choisis
                    for(let i = 0; i < interaction.values.length; i++) {
                        //! Et on les stoque dans la variable languages
                        languages.push(interaction.values[i]);
                    }

                    //? Puis on console.log pour le débug
                    await console.log('langage choisi');

                    //! Et on envoie le prochain menu déroulant
                    await interaction.update({ content: '**Choisissez le Thème du défi**', ephemeral: true, components: [themeSel] });

                }
                //! Si l'id du menu déroulant est themeSelector
                if (interaction.customId === 'themeSelector') {

                    //! Alors on créé l'embed
                    const embed = new MessageEmbed()
                        .setTitle(`${message.author.username} a lancé un défi à ${args.user.displayName}`)
                        .setDescription(`**Défi**: Ceci est le défi`)
                        .setThumbnail(args.user.user.displayAvatarURL())
                        .setFooter(`${languages[0]} - Le défi se termine dans: 30min`) //? Avec un langage de programmation fourni plus haut
                        .setColor('#35db61');

                    //! On récupere le thème choisi et on l'envoit dans la variable theme
                    theme.push(interaction.values[0]);

                    //? On console.log pour le débug
                    await console.log('thème choisi');

                    //! Et on envoie l'embed avec les boutons
                    await interaction.update({ embeds: [embed], components: [buttons] });

                }

                //! On définit un filtre pour l'interaction des boutons
                const filter = i => i.customId === 'infos' || i.customId === 'decline' || i.customId === 'accept';

                //! On met en place un collector pour récuperer les intéractions avec le filtre
                const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

                //! Si une intéraction est détéctée
                collector.on('collect', async i => {

                    //! Si l'id du bouton cliqué est infos
                    if (i.customId === 'infos') {

                        //! Alors on remplace les boutons par les boutons cliqués
                        await i.update({ content: '', components: [buttonsClicked] });

                    }

                    //! Si l'id du bouton cliqué est infos
                    if (i.customId === 'decline') {

                        //! Alors on remplace les boutons par les boutons cliqués
                        await i.update({ components: [buttonsClicked] });

                    }

                    //! Si l'id du bouton cliqué est infos
                    if (i.customId === 'accept') {

                        //! Alors on remplace les boutons par les boutons cliqués
                        await i.update({ components: [buttonsClicked] });

                    }
                });

                //? On console.log pour le débug
                collector.on('end', collected => console.log(`Collected ${collected.size} items`));

            });*/
        }
    }
}

module.exports = DuelCommand;
/*
*todo Selection du langage de programmation
*todo Selection du theme
todo Selection du temps imparti
*todo Envoi de la demande
todo réaction de la demande
todo timer
*/