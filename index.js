const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(express.json());
server.use('/api/user');
server.use('/api/posts');


server.listent(4000, ()=>{
    console.log('Listening on port 4000')
});