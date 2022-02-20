const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchemaFb = new Schema({
    mail: { type: String, trim: true },
    name: { type: String, trim: true },
    accessToken: { type: String, required: true },
    picture: { type: {} },
    description: {type: String}
}, { timestamps: true });

var UserFb = mongoose.model('UserFb', UserSchemaFb);
module.exports = UserFb;