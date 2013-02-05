var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/twitter');

var userSchema = mongoose.Schema({
  name: String
});

var User = mongoose.model('User', userSchema);

var tweetSchema = mongoose.Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String
});

var Tweet = mongoose.model('Tweet', tweetSchema);

//why does this use module.exports instead of exports? 
//http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-nodejs
exports.User = User;
exports.Tweet = Tweet;