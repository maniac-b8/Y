const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /post
router.get('/', postsCtrl.index);
// DELETE /posts/:id
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);
// GET /flights/new
router.get('/new', ensureLoggedIn, postsCtrl.new);
// GET /posts/:id (show)
router.get ('/:id', postsCtrl.show);
// POST /posts
router.post('/', ensureLoggedIn, postsCtrl.create);
// GET /post/:id/edit
router.get('/:id/edit', postsCtrl.edit);
// PUT /posts/:id
router.put('/:id', postsCtrl.update);


module.exports = router;