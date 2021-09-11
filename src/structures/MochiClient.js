const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { embed } = require('../util/functions');

module.exports = class MochiClient extends AkairoClient {
    constructor(config = {}) {
        super(
            { ownerID: '382945750872752146' },
            {
                allowedMentions: {
                    parse: ['roles', 'everyone', 'users'],
                    repliedUser: false
                },
                partial: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
                presence: {
                    status: 'dnd',
                    activities: [
                        {
                            name: 'LDDD',
                            type: 'COMPETING',
                            url: 'https://github.com/VoidSplit'
                        }
                    ]
                },
                intents: 32767
            }
        );

        this.commandHandler = new CommandHandler(this, {
            allowMentions: true,
            prefix: config.prefix,
            defaultCooldown: 2000,
            directory: './src/commands/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        this.functions = {
            embed: embed
        }
        console.log("   ·•· ·•· ·•·   ");
        this.commandHandler.loadAll();
        console.log("- All CommandHandlers loaded");
        this.commandHandler.useListenerHandler(this.listenerHandler);
        console.log("- CommandHandlers use ListenerHandler now");
        this.listenerHandler.loadAll();
        console.log("- All ListenerHandler loaded");
        console.log("   ·•· ·•· ·•·   ");
    }
}