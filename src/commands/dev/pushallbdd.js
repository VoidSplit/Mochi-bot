const { Command } = require('discord-akairo');
const { User } = require('../../structures/Models');

module.exports = class PushCommand extends Command {
  constructor() {
    super('push', {
      aliases: ['push'],
      category: 'dev',
      ownerOnly: true,
      description: {
          content: 'La commande push inscrit tout les membres du serveur dans la bdd',
          usage: 'push',
          exemples: ['push']
      }
    });
  }

    async exec(message) {
        for(let i = 0; i < message.guild.memberCount; i++) {
			if(!message.guild.members.cache.map(u => u.user)[i].bot) {
				if(message.guild.members.cache.map(u => u.user)[i].id)
				await User.findOrCreate({
					id: message.guild.members.cache.map(u => u.user)[i].id,
					pseudo: message.guild.members.cache.map(u => u.user)[i].tag,
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
					.setTitle("Add User to BDD !")
					.setDescription(`**User :** ${message.guild.members.cache.map(u => u.user)[i].tag}`)
					.setThumbnail(`${message.guild.members.cache.map(u => u.user)[i].displayAvatarURL(true)}`)
					.setColor('#42d6ff')
				await logChannel.send({embeds: [embed] })
					.then(() => console.log(`${message.guild.members.cache.map(u => u.user)[i].tag} à été ajouté a la bdd.`))
					.catch(() => console.log("guildMemberAdd -> message non envoyé"))
			}
        }
    }
};