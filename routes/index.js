/*
 * GET home page.
 */
var models = require('../models/models');

exports.list = function(req, res){
  var tweets = models.Tweet.find({}).sort({_id:-1}).populate('_user').exec(function(err, docs) {
    if (err)
      return console.log("error while listing tweets ", err);
    console.log("tweet listing complete");
    
    res.render('index', { title: 'Crappy Twitter', tweets: docs, logged: req.session.user==null });
  });
};

exports.tweet = function(req, res) {
  var newTweet = new models.Tweet({ _user: req.session.user._id, text: req.body.msg });

  newTweet.save(function(err, docs) {
    if (err)
      return console.log("error saving tweet", err);
    console.log("Created a new tweet");
    
    res.redirect('/');
  });
};