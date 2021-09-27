const { MessageEmbed, MessageButton } = require("discord.js")

module.exports = {
    embed: function() {
        return new MessageEmbed().setColor('#dc143c');
    },
    button: function() {
        return new MessageButton().setStyle('PRIMARY');
    }
}