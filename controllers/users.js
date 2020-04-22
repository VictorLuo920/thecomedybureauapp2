const User = require('../models/user');
const Event = require('../models/event');
const Note = require('../models/note');


// shows the user profile page, making sure bookmarked events are properly referenced with .populate()
const show = (req, res, next) => {
  User.findById(req.user._id).populate('bookmarkedEvents').populate('notes').exec((err, user) => {
    if (err) return handleError(err);
    res.render("profile", {user})
  })
};

// adds a comment and specifying its numerous UX restrictions: so that the comment is properly referenced to its specific bookmarked Event. 
const createNote = (req, res, next) => {
  // add event reference to req.body so event field is filled
  req.body.eventref = req.params.id;
  // create a new note
  const newNote = new Note(req.body);
  // commit the note to the db
  newNote.save();
  req.user.notes.push(newNote._id);
  req.user.save();
  res.redirect('/') 
};

// directs users to the comment edit page
const edit = (req, res, next) => {
  User.findById(req.user._id)
    .populate('bookmarkedEvents').populate('notes').exec(function(err, user) {
      if (err) return handleError(err);
      res.render('edit', {user});
  });
};

// should be saving the edits that are loaded into the inputs, but figuring out how to push the req.body (text) into the text: string value in my notes schema...
const update = (req, res, next) => {
  Note.update({_id: req.params.id}, {'text': req.body.text}, (err, updatedNote)=>{
    if (err) return handleError(err);
    res.redirect('/profile');
  })
};

// should be tied to an inline button that displays on the profile page that simply redirects or refreshes the profile page to show that the changes were made
const deleteNote = (req, res, next) => {
  Note.deleteOne({_id: req.params.id}, (err) => {
    if (err) return handleError(err);
    res.redirect('/profile');
  })
};


module.exports = {
  show,
  createNote,
  edit,
  update,
  delete: deleteNote
};
