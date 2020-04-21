const User = require('../models/user');
const Event = require('../models/event');
const Note = require('../models/note');


// shows the user profile page, making sure bookmarked events are properly referenced with .populate()
const show = (req, res, next) => {
  User.findById(req.user._id).populate('bookmarkedEvents').exec((err, user) => {
    res.render("profile", {user})
  })
};

// adds a comment and specifying its numerous UX restrictions: so that the comment is properly referenced to its specific bookmarked Event. 
const createNote = (req, res, next) => {
  console.log("trying ot create a note")
  // Event.findOne({_id: req.params.id}, (err, event) => {
    // console.log(req.params.id);
    // console.log(event._id);
    // create new Note
    req.body.eventref = req.params.id;
    const newNote = new Note(req.body);
    console.log("new note:", newNote);
    // User.findById(req.user._id, (err, userData) => {
    //   req.body.eventref = req.params.id;
    //   userData.notes.push(req.body);
    //   userData.save();
    // })
  // });
  // res.redirect('/') // this is a buggy feature that is not going to break, but trying to implement a different res.redirect or render just hasn't veen very successul. 
};

// directs users to the comment edit page
const edit = (req, res, next) => {
  User.findById(req.user._id)
    .populate('bookmarkedEvents').exec(function(err, user) {
      res.render('edit', {user});
  });
};

// should be saving the edits that are loaded into the inputs, but figuring out how to push the req.body (text) into the text: string value in my notes schema...
const update = (req, res, next) => {
  User.findById((req.user._id), (err, userData) => {
    // console.log(userData.notes); // spits out the array of notes[noteSchema] array
    console.log('this one is req', req.params.id); // does spit out the note._id that it corresponds to 
    noteToEdit = userData.notes.findById( (note) => {

      return note._id = req.params.id
    });
    console.log('this one is note', noteToEdit); // got the specific note
    // noteToEdit.text = req.body.text; // set new text
    userData.save();
    res.redirect('/profile');
  });
};

// should be tied to an inline button that displays on the profile page that simply redirects or refreshes the profile page to show that the changes were made
const deleteNote = (req, res, next) => {
  User.findById(req.user._id), (err, userData) => {
      userData.notes = userData.notes.filter((note) => {return !(note._id = req.params.id)});
      userData.save();
      res.redirect('/profile'); // currently getting where its hitting the route but never returning? see terminal code below
    };
};


module.exports = {
  show,
  createNote,
  edit,
  update,
  delete: deleteNote
};
