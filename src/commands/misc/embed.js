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
                usage: 'embed [color] .s; [title] .s; [description] .s; <fieldTitle> .s; <fieldContent>',
                exemples: ['embed #eb4034 .s; Ceci est un titre .s; Ceci est la description de mon embed', 'embed #eb4034 .s; Ceci est un titre .s; Ceci est la description de mon embed .s; ceci est le titre du field .s; ceci est la description du field']
            },
            channel: 'guild',
            args: [
                { id: 'Color', type: 'text', default: '#ffffff' },
                { id: 'Title', type: 'text', default: 'Title' },
                { id: 'Description', type: 'text', default: 'Description' },
                { id: 'FieldTitle', type: 'text', default: '' },
                { id: 'FieldContent', type: 'text', default: '' }
            ],
            separator: '.s;'
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