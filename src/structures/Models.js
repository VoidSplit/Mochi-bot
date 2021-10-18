const { Schema, model } = require('mongoose');

const guildSchema = Schema({
    id: String,
    prefix: {
        type: String,
        default: '%'
    }
});

const userSchema = Schema({
    id: String,
    pseudo: String,
    experience: Number,
    level: Number,
    glory: Number,
    challenge: Boolean,
    id_challenge: String
});

module.exports = {
    Guild: model('Guild', guildSchema),
    User: model('User', userSchema)
}