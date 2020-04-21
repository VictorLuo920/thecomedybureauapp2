const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new mongoose.Schema({
  text: String, 
  eventref: {type: Schema.Types.ObjectId, ref: 'Event'}
  }, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);