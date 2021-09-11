const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    exec() {
        console.log( "\u001b[0;32m Mochi is ready.\u001B[0m");
        console.log("   ·•· ·•· ·•·   ")
    }
}

module.exports = ReadyListener;