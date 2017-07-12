const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  req.body.author = req.user._id;
  req.body.store = req.params.id;

  const newReview = new Review(req.body);
  await newReview.save();

  req.flash('success', 'Thanks! Your review was added!');
  res.redirect('back');
};
