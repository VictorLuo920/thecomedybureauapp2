const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    name: String,
    url: String,
    usersBookmarked: [{type: Schema.Types.ObjectId, ref: 'User'}],
    ticketmasterId: String,
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Event', eventSchema);