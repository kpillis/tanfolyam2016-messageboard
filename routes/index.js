var express = require('express');
var router = express.Router();

var listPosts = require('../middleware/listPosts');
var addPost = require('../middleware/addPost');
var likePost = require('../middleware/likePost');
var commentOnPost = require('../middleware/commentOnPost');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/board', listPosts);

router.post('/board/add', addPost);

router.put('/board/like/:postId', likePost);

router.put('/board/comment/:postId', commentOnPost);


module.exports = router;