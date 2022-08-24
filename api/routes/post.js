// Filename: /routes/posts.js
// August 6, 2022

const express = require('express');
const PostRouter = express.Router()
const Post = require('../models/post');
const expiredPost = require('../models/expiredPost');
const { nanoid, } = require('nanoid')

// GET /post/
PostRouter.get('/', (req, res) => {
    return res.status(200).send('Go to /post/{id} to view a post.')
});

// GET /post/{id}
PostRouter.get('/:uri/', async (req, res) => {
    const uri = req.params.uri;
    const post_is_expired = await isExpired(uri);
    if (post_is_expired) {
        // delete post from expiredPost & Post
        await expiredPost.deleteOne({ 'uri': uri });
        await Post.deleteOne({ 'uri': uri });
        return res.status(404).send({
            'error': 'Expired Post'
        });
    }

    await updateVisitCounter(uri);
    const post = await Post.findOne({ 'uri': uri })
    if (post) {
        return res.status(200).send(JSON.stringify({
            'title': post.title,
            'message': post.message,
            'postedOn': post.dateCreated,
            'uri': post.uri,
            'expiresIn': post.expiresIn,
            'visits': post.visits
        }));
    }


    return res.status(200).send(JSON.stringify({
        'status': 'error',
        'message': 'post does not exist',
    }))
})

// POST /post/
PostRouter.post('/', async (req, res) => {
    console.log(req.body);
    
    let title = req.body.title;
    let message = req.body.message;
    let expiresIn = req.body.expiresIn === undefined ? 0 : req.body.expiresIn;

    // Title or Message not recieved - 400 error
    if (title === undefined && title !== '' || message === undefined && message !== '') {
        return res.status(400).send(JSON.stringify({
            'status': 'error',
            'message': 'title or message not sent in request',
            'parms': {
                'title': title,
                'message': message
            }
        }));
    }

    const post = await Post.create({
        'title': title,
        'message': message,
        'expiresIn': expiresIn,
        'uri': nanoid(13)
    });

    if (expiresIn !== 0) {
        console.log({
            'uri': post.uri,
            'expiresOn': calculateExpiryTime(expiresIn)
        })

        const expiry = calculateExpiryTime(expiresIn);
        const expirePostDoc = await expiredPost.create({
            'uri': post.uri,
            'expiresOn': expiry
        });
        console.log(`${new Date()}: ${post.uri} expires on ${expirePostDoc.expiresOn}`);
    }

    return res.status(200).send(JSON.stringify({
        'status': 'success',
        'message': `post succesfully saved at /post/${post.uri}`
    }));
});

const calculateExpiryTime = (expireSeconds) => {
    var date = new Date();
    date = new Date(date.getTime() + (expireSeconds * 1000));
    return date.toISOString();
}

const isExpired = async (uri) => {
    const post = await expiredPost.findOne({ 'uri': uri })
    if (post) {
        // verify it has expired
        const date = new Date();
        return date > new Date(post.expiresOn);
    }
    return false; // post has no expiry
}

const updateVisitCounter = async (uri) => {
    const p = await Post.findOne({ 'uri': uri });
    if (p) {
        const current_month = new Date().getMonth();
        if (new Date(p.lastUpdated).getMonth() != current_month) {
            p.visits = 1;
        } else {
            p.visits += 1
        }
        p.lastUpdated = new Date();
        await p.save()

        // const post = await Post.findOneAndUpdate({ 'uri': uri }, { '$inc': { 'visits': 1 } })
        console.log(`${uri} has ${p.visits} visits`)
    }
}

module.exports = PostRouter;
// EOF