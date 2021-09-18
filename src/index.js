const MochiClient = require('./structures/MochiClient');

let client = new MochiClient({
    prefix: '%'
});
client.start();