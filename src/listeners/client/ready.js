const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    exec() {
        console.log('Mochi is ready.');
        console.log("   ·•· ·•· ·•·   ")
    }
}

module.exports = ReadyListener;