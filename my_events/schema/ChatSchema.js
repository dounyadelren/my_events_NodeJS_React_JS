const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    id_event: { type: String, trim: true },
    name: { type: String },
    message: { type: String }
}, { timestamps: true });

var Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;