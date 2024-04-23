const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// POST comment
router.post('/:id/comments', commentCtrl.create);
// DELETE comment
router.delete('/:postId/comments/:commentId', ensureLoggedIn, commentCtrl.delete);

module.exports = router;
