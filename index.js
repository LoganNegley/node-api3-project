const express = require('express');
const userRouter = require('./users/userRouter');

const server = express();
server.use(express.json());


server.listent(4000, ()=>{
    console.log('Listening on port 4000')
});