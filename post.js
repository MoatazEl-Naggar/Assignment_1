const express = require('express');
const postController = require('./controllers/post');

const router = express.Router();

router.post('/post', postController.newPost)
router.get('/post/category/:category', postController.getPostByCategory)
router.get('/post/user/:username', postController.getPostByUser)

module.exports = router;
