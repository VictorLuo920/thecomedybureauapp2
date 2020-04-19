const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new mongoose.Schema({
  text: String,
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}],
  userName: String
}, {
  timestamps: true
});

const eventSchema = new mongoose.Schema({
    name: String,
    url: String,
    usersBookmarked: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [commentSchema],
    ticketmasterId: String,
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Event', eventSchema);