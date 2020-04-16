const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const helmet = require('helmet')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/user', userRouter);
server.use('/api/posts', postRouter);


server.get('/', (req, res) => {
  const nameInsert = (req.body.name ? `${req.body.name}` : '');
  res.send(`<h2>Let's write some middleware ${nameInsert}!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log( `${req.method} ${req.originalUrl} ${new Date()}`)
  next();
}

module.exports = server;
