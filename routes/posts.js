const express = require('express');

const postController = require('../controllers/post_controller');


const router = express.Router();


router.post('/posts',postController.save);
router.put('/posts/:id',postController.update);
router.get('/posts/:id',postController.show);
router.delete('/posts/:id',postController.deletePost);
router.get('/posts',postController.index);

module.exports = router;