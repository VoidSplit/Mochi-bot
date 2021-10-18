const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { embed, button } = require('../util/functions');
const mongoose = require('mongoose');
const { GuildsProvider } = require('../structures/Providers');
const { TOKEN, MONGOSTRING } = require('../util/config');

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
                            name: '!help',
                            type: 'PLAYING',
                            url: 'https://github.com/VoidSplit'
                        }
                    ]
                },
                intents: 32767
            }
        );
        this.commandHandler = new CommandHandler(this, {
            allowMentions: true,
            prefix: async message => {
                const guildPrefix = await this.guildSettings.get(message.guild);
                if(guildPrefix) return guildPrefix.prefix;
                return config.prefix;
            },
            defaultCooldown: 2000,
            directory: './src/commands/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        this.functions = { embed: embed, button: button }
        this.guildSettings = new GuildsProvider();
    }

    init() {
        console.log("\n   ·•· ·•· ·•·   ");
        this.commandHandler.useListenerHandler(this.listenerHandler);
        console.log("\u001b[0;34m- CommandHandlers use ListenerHandler now");
        this.commandHandler.loadAll();
        console.log("- All CommandHandlers loaded");
        console.log(`\u001b[0;33m   Commands => ${this.commandHandler.modules.size}`)
        this.listenerHandler.loadAll();
        console.log("\u001b[0;34m- All ListenerHandler loaded");
        console.log(`\u001b[0;33m   Listeners => ${this.listenerHandler.modules.size}\u001B[0m`)
        console.log("   ·•· ·•· ·•·   ");
    }

    async start() {
        try {
            await mongoose.connect(MONGOSTRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("   ·•· ·•· ·•·   \n");
            console.log("\u001b[0;33m- DB connectée\u001B[0m");
        } catch(e) {
            console.log("   ·•· ·•· ·•·   \n");
            console.log("\u001b[0;33m- DB pas connectée! Voir l'erreur ci-dessous!\u001B[0m\n\n", e);
            return process.exit();
        }

        await this.init();
        return this.login(TOKEN);
    }
}