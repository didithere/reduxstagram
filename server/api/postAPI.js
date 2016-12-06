var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.route('/posts')
    .post(function(req, res){
        var post = new Post();
        post.code = req.body.code;
        post.caption = req.body.caption;
        post.likes = req.body.likes;
        post.id = req.body.id;
        post.display_src = req.body.display_src;
        post.save(function(err, post){
            if (err) {
                return res.status(500).send(err);
            }
            return res.json(post);
        });
    })
    .get(function(req, res){
        Post.find(function(err, posts){
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(posts);
        });
    })

router.route('/posts/:id')
    .put(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err) 
                res.status(500).send(err);

            post.likes = post.likes + req.body.increment;

            post.save(function(err, post){
                if(err) 
                    res.status(500).send(err);
                res.json(post);
            });
        });
    })
    .get(function(req,res){
        Post.findById(req.params.id, function(err, post){
            if(err) 
                res.send(err);
            res.json(post);
        });
    })

module.exports = router;