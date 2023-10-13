const express = require('express');

const postController = require('../controllers/post_controller');
const isAuth = require('../middleware/isAuth');

const router = express.Router();


router.post('/posts',isAuth,postController.save);
router.put('/posts/:id',postController.update);
router.get('/posts/:id',postController.show);
router.delete('/posts/:id',postController.deletePost);
router.get('/posts',isAuth,postController.index);

module.exports = router;