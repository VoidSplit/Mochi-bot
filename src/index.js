const { TOKEN } = require('./util/config')
const MochiClient = require('./structures/MochiClient');

let client = new MochiClient({
    prefix: '%'
});
client.login(TOKEN);