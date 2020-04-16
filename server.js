const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const helmet = require('helmet')

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/user', userRouter);
server.use('/api/posts', postRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  
}

module.exports = server;
