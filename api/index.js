// Filename: index.js
// August 6, 2022

require('./db').connect()

const config = require('./config');
const express = require('express');
const app = express();

// Router
const PostRouter = require('./routes/post');

app.use(express.json());
app.use('/post', PostRouter)

app.get('/', (req, res) => {
    res.status(200).send('You have reached the post route! Send a POST request with the fields `title`, `message` & optional `expiresIn` (seconds) to /post to post a message. Go to /post/{id} to view a post.')
})


app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
}) 

// EOF