const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor() {
        super('Embed', {
            aliases: ['embed', 'emb'],
            category: 'misc',
            cooldown: 5000,
            userPermissions: 'KICK_MEMBERS',
            description: {
                content: 'La commande embed renvoie un embed personnalisé',
                usage: 'embed [color] | [title] | [description] | <fieldTitle> | <fieldContent>',
                exemples: ['embed #eb4034 | Ceci est un titre | Ceci est la description de mon embed', 'embed #eb4034 | Ceci est un titre | Ceci est la description de mon embed | ceci est le titre du field | ceci est la description du field']
            },
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