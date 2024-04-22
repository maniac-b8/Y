const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  index,
  show,
  new: newPost,
  create,
  edit,
  update,
  delete: deletePost,
};

async function index(req, res) {
  try {
    const posts = await Post.find({});
    res.render("posts/index", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
async function show(req, res) {
  const post = await Post.findById(req.params.id);
  // const comments = await Comment.find({ post: post._id })  for comments
  res.render("posts/show", { title: "All Posts", post }); // add comments after post at end
}

async function create(req, res) {
  for (const key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  console.log(req.body);
  try {
    console.log("HALP");
    req.body.author = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    await Post.create(req.body);
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.render("posts/show", { errorMsg: err.message });
  }
}

async function deletePost(req, res) {
  try {
    console.log("Deleting post ID:", req.params.id);
    console.log("User ID:", req.user._id);

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    console.log("Deleted Post:", deletedPost);

    if (!deletedPost) {
      return res.status(404).send("Post not found or unauthorized to delete.");
    }

    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

function newPost(req, res) {
  res.render("posts/new", { errorMsg: "" });
}

async function edit(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.render("posts/edit", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function update(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.author.equals(req.user._id)) {
      return res.status(403).send("Unauthorized");
    }

    post.content = req.body.content;
    post.updatedAt = new Date();
    await post.save();

    res.redirect(`/`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
