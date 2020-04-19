const request = require('request');
const rootURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=aAdFKybrpPXyG4rJqVZZMeBwLmxASYcP&radius=100&locale=*&countryCode=US&classificationId=KnvZfZ7vAe1&dmaId=324';
const Event = require('../models/event');
const User = require('../models/user')

// this loads the events page: first it makes a request to the API to retrieve those JSON packs, parses them, uses a for loop to iterate over each received package and magically copying a version of the data onto my own database! the power of findOneandUpdate with upsert...
const index = (req, res, next) => {
  request(rootURL, (err, response, body) => {
    const eventsData = JSON.parse(body);
    for (event = 0; event < eventsData._embedded.events.length; event++) {
      Event.findOneAndUpdate(
        {ticketmasterId: eventsData._embedded.events[event].id}, 
        eventsData._embedded.events[event], 
        {new: true, upsert: true},
        (err, event) => {
          return;
        }
      )
    };
    res.render('events', {events: eventsData._embedded.events});
  });
}

// this bookmarks the event to associate the Eventid with the user's Bookmarked events field so that the user had their own reference point to make notes on the event
const bookmark = (req, res, next) => {
  Event.findOne({ticketmasterId: req.params.id}, (err, event) => {
    User.findById(req.user._id, (err, userData) => {
      if (userData.bookmarkedEvents.includes(event._id)) {return};
      userData.bookmarkedEvents.push(event);
      userData.save();
    })
  });
  res.redirect('/');
}

module.exports = {
    index,
    bookmark
};