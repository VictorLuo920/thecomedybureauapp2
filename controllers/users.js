const User = require('../models/user');
const Event = require('../models/event');


// shows the user profile page, making sure bookmarked events are properly referenced with .populate()
const show = (req, res, next) => {
  User.findById(req.user._id).populate('bookmarkedEvents').exec((err, user) => {
    res.render("profile", {user})
  })
};

// adds a comment and specifying its numerous UX restrictions: so that the comment is properly referenced to its specific bookmarked Event. 
const createNote = (req, res, next) => {
  Event.findOne({_id: req.params.id}, (err, event) => {
    console.log(req.params.id);
    console.log(event._id);
    User.findById(req.user._id, (err, userData) => {
      req.body.eventref = req.params.id;
      userData.notes.push(req.body);
      userData.save();
    })
  });
  res.redirect('/') // this is a buggy feature that is not going to break, but trying to implement a different res.redirect or render just hasn't veen very successul. 
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
  Event.findOne({_id: req.params.id}, (err, event) => {
    User.findById(req.user._id).populate('bookmarkedEvents').then( (err, userData) => {
      const notetexttoupdate = userData.notes.find( ({ eventref }) => eventref === req.params.id).text;
      notetexttoupdate = req.body.text;
      res.redirect('/profile')
    });
})};

// should be tied to an inline button that displays on the profile page that simply redirects or refreshes the profile page to show that the changes were made
const deleteNote = (req, res, next) => {
  Event.findOne({_id: req.params.id}, (err, event) => {
    User.findById(req.user._id).populate('bookmarkedEvents').then( (err, userData) => {
      //function to specify the note and to 
      res.redirect('/profile')
    });
})
};

// const TryingtoWritenewFunctions = (req, res, next) => {User.findById(req.user._id).populate(' how do I specifically populate the embebdded subdocument?').then((user) => {
//   user.notes[i].text = req.body.text;/// these two lines are about updating the notes array
//   //res.redirect("/profile");

//   user.notes = user.notes.filter( (note, noteidx, notesarr) => {return note.eventref !==  req.params.id} );
//   // this is trying to delete
// })}

module.exports = {
  show,
  createNote,
  edit,
  update,
  delete: deleteNote
};
