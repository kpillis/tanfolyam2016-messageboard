var myModule = require('./module');

module.exports = function (req, res, next) {
    var postId = req.params.postId;

    var posts = myModule.posts;
    for(i=0; i < posts.length; i++){
        if(posts[i].id == postId){
            posts[i].likes++;
        }
    }

    res.send('Liked post:' + postId);
};
