var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
    code: String,
    caption: String,
    likes: Number,
    id: String,
    display_src: String
});

var commentSchema = new mongoose.Schema({
    code: String,
    text: String,
    user: String
});

mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);