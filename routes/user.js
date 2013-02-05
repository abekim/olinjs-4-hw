/*
 * GET users listing.
 */
var models = require('../models/models');

exports.new = function(req, res) {
  res.render('newUser', { title: "Create a New User or Login" });
};

exports.create = function(req, res) {
  var user = models.User.find({ name: req.body.username }).exec(function(err, docs) {
    if (err)
      return console.log("error while looking up user with the name, " + req.body.username);
    if (!docs.length) {
      var newUser = new models.User({ name: req.body.username });

      newUser.save(function(err) {
        if (err)
          return console.log("error while saving user, " + req.body.username, err);
        console.log("created a new user, " + req.body.username);
      });

      req.session.user = newUser;
      console.log("New session: " + req.session.user);

      res.redirect('/');
    } else if (docs.length == 1) {
      req.session.user = docs[0];
      console.log("New session: " + req.session.user);
      
      res.redirect('/');
    } else {
      console.log("ERROR: more than one user with the same username");
      res.redirect('/users/new');
    }
  });
};

exports.logout = function(req, res) {
  req.session.user = null;
  console.log("Session closed");
  
  res.redirect('/users/new');
};