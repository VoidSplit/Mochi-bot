const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor() {
        super('Embed', {
            aliases: ['embed', 'emb'],
            //description: 'Affiche les information de l\'utilisateur'
            // ignoreCooldown: '382945750872752146',
            // ignorePermissions: '382945750872752146',
            //userPermissions: 'KICK_MEMBERS',
            //ratelimit: 2,
            cooldown: 5000,
            //typing: true,
            //ownerOnly: true,
            channel: 'guild',
            args: [
                { id: 'Color', type: 'text', default: '#ffffff' },
                { id: 'Title', type: 'text', default: 'Title' },
                { id: 'Description', type: 'text', default: 'Description' },
                { id: 'FieldTitle', type: 'text', default: '' },
                { id: 'FieldContent', type: 'text', default: '' }
            ],
            separator: '|'
        });
    }
    exec(message, args) {
        if(args.FieldTitle == "" || args.FieldContent == "") {
            return message.channel.send({ embeds: [
                this.client.functions.embed()
                    .setColor(args.Color)
                    .setDescription(args.Description)
                    .setTitle(args.Title)
                    .setTimestamp()
            ] });
        }
        else {
            return message.channel.send({ embeds: [
                this.client.functions.embed()
                    .setColor(args.Color)
                    .setDescription(args.Description)
                    .setTitle(args.Title)
                    .addField(args.FieldTitle, args.FieldContent)
                    .setTimestamp()
            ] });
        }
    }
}

module.exports = EmbedCommand;