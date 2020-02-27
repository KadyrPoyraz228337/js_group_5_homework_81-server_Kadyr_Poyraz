const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
        shortUrl: {
            type: String,
            required: true
        },
        originalUrl: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    });

module.exports = mongoose.model('Link', LinkSchema);