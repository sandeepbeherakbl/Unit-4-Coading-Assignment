const express = require('express');

const userControlle = require('./controllers/user_controlle');
const postControlle = require('./controllers/post_controlle');
const tagControlle = require('./controllers/tags_controlle');
const commentControlle = require('./controllers/comment_controlle');

const app = express();

app.use(express.json());

app.use('/user' , userControlle);
app.use('/post' , postControlle);
app.use('/tags' , tagControlle);
app.use('/comment' , commentControlle);

module.exports = app;