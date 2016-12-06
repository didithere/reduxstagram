import request from 'superagent';
import _ from 'lodash';

// increment
export function increment(index){
    return {
        type: 'INCREMENT_LIKES',
        index
    }
}

// add comment
export function addComment(postId, author, comment){
    console.log('post id', postId);
    return {
        type: 'ADD_COMMENT',
        postId,
        author,
        comment
    }
}

// remove comment
export function removeComment(postId, i){
    console.log('remove comment', i);
    return {
        type: 'REMOVE_COMMENT',
        i,
        postId
    }
}

export function loadPost(posts = []){
    return {
        type: 'LOAD_POST',
        posts
    }
}

export function loadComment(comments = []){
    return {
        type: 'LOAD_COMMENT',
        comments
    }
}

export function loadPostData(){
    console.log('initial post');
    return (dispatch) => {
        request.get('http://localhost:7770/api/posts')
        .end((err, res) => {
            var posts = JSON.parse(res.text);
            console.log(posts);
            dispatch(loadPost(posts));
        })
    }
}

export function likePost(i, id){
    console.log(id);
    return (dispatch) => {
        request.put('http://localhost:7770/api/posts/'+id)
        .send({increment: 1})
        .end((err, res) => {
            dispatch(increment(i));
        })
    }
}

export function loadCommentData(){
    console.log('initial comment');
    return (dispatch) => {
        request.get('http://localhost:7770/api/comments')
        .end((err, res) => {
            var comments = _.groupBy(JSON.parse(res.text), (d) => {return d.code});
            console.log('comments', comments);
            dispatch(loadComment(comments));
        })
    }
}

export function postComment(postId, author, comment){
    return (dispatch) => {
        request.post('http://localhost:7770/api/comments')
        .send({code: postId, text: comment, user: author})
        .end((err, res) => {
            if (res.ok) {
                console.log('success', JSON.stringify(res.body));
                console.log('params', postId, author, comment)
                dispatch(addComment(postId, author, comment));
            }
        })
    }
}

export function deleteComment(postId, i, id){
    return (dispatch) => {
        request.del('http://localhost:7770/api/comments/'+id)
        .end((err, res) => {
            if (res.ok) {
                console.log('params', postId, i, id)
                dispatch(removeComment(postId, i));
            }
        })
    }
}
