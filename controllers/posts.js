const Post = require ('../models/post')
const User = require ('../models/user')

module.exports = {
    index,
    show,
    new: newPost,
    create
};

async function index(req, res) {
    try {
        const posts = await Post.find({});
        res.render('posts/index', { posts }); // Pass the posts variable to the view
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function show(req, res) {
    const post = await Post.findById(req.params.id);
    // const comments = await Comment.find({ post: post._id })  for comments
    res.render('posts/show', { title: 'All Posts', post }) // add comments after post at end
}

async function create(req, res) {
    for (const key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        req.body.author = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        
        await Post.create(req.body);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.render('posts/show', { errorMsg: err.message });
    }
}

function newPost(req, res) {
    res.render('posts/new', { errorMsg: '' });
}