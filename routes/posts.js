const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /post
router.get('/', postsCtrl.index);
// GET /flights/new
router.get('/new', ensureLoggedIn, postsCtrl.new);
// GET /posts/:id (show)
router.get ('/:id', postsCtrl.show);
// POST /posts
router.post('/', ensureLoggedIn, postsCtrl.create);

module.exports = router;