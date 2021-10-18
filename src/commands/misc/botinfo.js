const { Command } = require('discord-akairo');

class BotInfoCommand extends Command {
    constructor() {
        super('botinfo', {
            aliases: ['botinfo'],
            category: 'misc',
            userPermissions: 'KICK_MEMBERS',
            ratelimit: 2,
            cooldown: 5000,
            ownerOnly: false,
            channel: 'guild',
            description: {
                content: 'La commande botinfo renvoie des informations sur le bot !',
                usage: 'botinfo',
                exemples: ['botinfo']
            }
        });
    }
    exec(message, args) {
        const bot = this.client;
        const nonBotUsers = this.client.users.cache.filter(user => !user.bot);
        const botUsers = this.client.users.cache.filter(user => user.bot);
        return message.channel.send({ embeds: [
            bot.functions.embed()
                .setColor("#4287f5")
                .setThumbnail(bot.user.displayAvatarURL())
                .addFields(
                    { name: '**► Owner:**', value: `[VoidSplit#9357](https://github.com/VoidSplit)`, inline: false },
                    { name: '**► Username:**', value: `${bot.user.username}`, inline: false },
                    { name: '**► Uptime:**', value: `${bot.uptime / 1000}s`, inline: true },
                    { name: '**► Users:**', value: `${nonBotUsers.size}`, inline: true },
                    { name: '**► Bots:**', value: `${botUsers.size}`, inline: true },
                    { name: '**► Servers:**', value: `${bot.guilds.cache.size}`, inline: true },
                    { name: '**► Salons textuels:**', value: `${bot.channels.cache.filter((c) => c.type === "GUILD_TEXT" || c.type === "GUILD_NEWS" || c.type === "GUILD_STORE").size}`, inline: true },
                    { name: '**► Salons vocaux:**', value: `${bot.channels.cache.filter((c) => c.type === "GUILD_VOICE" || c.type === "GUILD_STAGE_VOICE").size}`, inline: true },
                    { name: '**► Threads:**', value: `${bot.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" || c.type === "GUILD_PUBLIC_THREAD" || c.type === "GUILD_PRIVATE_THREAD").size}`, inline: true },
                    { name: '**► Catégories:**', value: `${bot.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`, inline: true }
                )
                .setTimestamp()
        ] });
    }
}

module.exports = BotInfoCommand;





