const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    minlength: 1,
    maxlength: 180
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: String,
  userAvatar: String
},{
  timestamps: true
})

const postSchema = new Schema({
  content: {
    type: String,
    minlength: 1,
    maxlength: 280 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  userName: String,
  userAvatar: String,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
 comments: [commentSchema]
},
{
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);