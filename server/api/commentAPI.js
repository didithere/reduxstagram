var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.route('/comments')
    .post(function(req, res){
        var comment = new Comment();
        comment.code = req.body.code;
        comment.text = req.body.text;
        comment.user = req.body.user;
        comment.save(function(err, comments){
            if (err) {
                return res.status(500).send(err);
            }
            return res.json(comments);
        });
    })
    .get(function(req, res){
        Comment.find(function(err, comments){
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(comments);
        });
    })

router.route('/comments/:id')
    .delete(function(req,res){
        Comment.remove({
            _id: req.params.id
        }, function(err){
            if(err) res.send(err);
            res.json('deleted');
        });
    });


module.exports = router;