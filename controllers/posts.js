const Post = require("../models/post");

module.exports = {
  index,
  show,
  create,
  edit,
  update,
  likePost,
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
  res.render("posts/show", { title: "All Posts", post });
}

async function create(req, res) {
  for (const key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
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

async function likePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found.");
    }
    const alreadyLiked = post.likes.some((userId) =>
      userId.equals(req.user._id)
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((userId) => !userId.equals(req.user._id));
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();
    res.redirect(`/posts`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!deletedPost) {
      return res.status(404).send("Post not found or unauthorized to delete.");
    }
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
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
    await post.save();

    res.redirect(`/`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
