const Post = require('../models/post');

module.exports = {
    create: createComment,
    delete: deleteComment
  };

  async function deleteComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const comment = post.comments.find(comment => comment._id.toString() === commentId);
      if (!comment) {
        return res.status(404).send("Comment not found or unauthorized to delete.");
      }
      post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
      await post.save();
      res.redirect('/posts')
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }

  async function createComment(req, res) {
    const post = await Post.findById(req.params.id);

    req.body.author = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    post.comments.push(req.body);
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/posts`);
  }
