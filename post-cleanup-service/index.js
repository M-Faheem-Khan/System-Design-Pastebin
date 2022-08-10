// Filename: config.js
// August 6, 2022

require('./db').connect()
const config = require('./config');
const expiredPosts = require('./models/expiredPost');
const post = require('./models/post');
const posts = require('./models/post');

// Read docs from expiredPosts where date < current date
// Delete the docs from posts & expiredPosts collections
const RemoveExpiredPosts = async () => {
    const expired_posts = await expiredPosts.find({
        'expiresOn': { '$lte': new Date().toISOString() }
    })

    if (expired_posts.length === 0) {
        console.log('No expired posts found')
    } else {

        expired_posts.forEach(async (expired_post) => {
            const p = await post.findOneAndDelete(
                { 'uri': expired_post.uri }
            );
            await expired_post.delete();
            console.log(`Deleted: ${expired_post.uri} - ${p.title}`)
        })
    }
}


setInterval(() => {
    RemoveExpiredPosts()
}, config.CLEANUP_SERVICE_RUN_INTERVAL);

// EOF