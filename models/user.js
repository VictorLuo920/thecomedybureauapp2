const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const noteSchema = new mongoose.Schema({
//   text: String, 
//   eventref: {type: Schema.Types.ObjectId, ref: 'Event'}
//   }, {
//     timestamps: true
// });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  notes: [{type: Schema.Types.ObjectId, ref: 'Note'} ], // find some way to embed this into the bookmarked events
  bookmarkedEvents: [{type: Schema.Types.ObjectId, ref: 'Event', unique: true} ],
  // recentPosts: [{type: Schema.Types.ObjectId.comments, ref: 'Event'}] // not sure how to do this to refer to the embedded posts of another, but this is probably an extra feature to add later down the ice box
  }, {
    timestamps: true
  },);

// userSchema.methods.addNotetoEvent = function addNotetoEvent() {
//   // I'm trying to write a method... that somehow... lets me... check what the note's eventref property is...so that I can restrict the view of the comments in my foreach method to each particular event in the profile view... my hope is to use this as a promise that can check the eventref during the ejs render....which is scope locked to the user... but fuck the stack overflow that inspired this doesn't map quite correctly either... 
//   userSchema.notes
//   Event.findOne({ticketmasterId: req.params.id}, )
//   user.notes.forEach()
//   user.bookmarkedEvents.forEach(function(event) {
//   if () {};

// };

module.exports = mongoose.model('User', userSchema);