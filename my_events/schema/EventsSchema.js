const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventsSchema = new Schema({
    id_user: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    adress: { type: String, trim: true },
    date: { type: Date },
    status: { type: String },
    organisateur: { type: String },
    guest: { type: {} },
    picture: { type: {}},
    lo: { type: Number},
    la: { type: Number}
}, { timestamps: true });

var Events = mongoose.model('Event', EventsSchema);
module.exports = Events;