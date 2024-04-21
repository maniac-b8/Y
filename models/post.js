const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  userName: String,
  userAvatar: String
});

module.exports = mongoose.model('Post', postSchema);