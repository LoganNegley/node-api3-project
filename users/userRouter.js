const express = require('express');
const db = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();

// Create a new user
router.post('/', (req, res) => {
  if(!req.body.name){
    res.status(400).json({
      errorMessage: 'Please include a name for new user'
    })
  } else{
    db.insert(req.body)
      .then(user =>{
        res.status(201).json(user)
      })
      .catch(error =>{
        res.status(500).json({
          errorMessage: 'Error creating new user'
        })
      })
  }
});

// Creat new post for user 
router.post('/:id/posts', validateUserId, (req, res) => {
    if(!req.body.text){
      res.status(400).json({
        errorMessage: 'Please provide text for this post'
      })
    }
          let newPost = {
            text:req.body.text,
            user_id: req.params.id
          }
          postDB.insert(newPost)
          .then(post =>{
            res.status(200).json(post)
          })
          .catch(error =>{
          res.status(500).json({
          error: 'There was an error while saving post to a user'
        })
      })
});

// Get user
router.get('/', (req, res) => {
  db.get()
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(error =>{
    res.status(500).json({
      errorMessage: 'The user information could not be retreived'
    })
  })
});

// Get user with ID
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
})

// Get posts with user ID
router.get('/:id/posts', validateUserId, (req, res) => {
          postDB.get()
            .then(post =>{
              res.status(200).json(post)
            })
        .catch(error =>{
          res.status(500).json({
          error: 'Error geting user post'
        })
      })
});

// Delete user
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
      .then(user =>{
        if(!user){
          res.status(404).json({
            message:'User with that ID does not exist'
          })
        }else{
          res.status(200).json(user)
        .catch(error =>{
          res.status(500).json({
          error: 'The user was not able to deleted'
        })
      })
  }}
)
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, {
    name: req.body.name
  })
    .then(user =>{
      if(!user){
        res.status(404).json({
          message:"The user with that specific ID does not exist"
        })
      }
      
      if(!req.body.name){
        res.status(400).json({
          errorMessage: 'You must provide a name for updating user'
          })
        }else{
          res.status(200).json(user)
        }
    })
    .catch(error =>{
      res.status(500).json({
        errorMessage: 'User was not able to be updated'
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  db.getById(id)
  .then(user =>{
    if(user){
      req.user = user
      next();
    }else{
      res.status(404).json({
        message: 'User with that ID does not exist'
      })
    }
  })
  .catch(error =>{
    res.status(500).json({
      errorMessage: 'Failed request for user with that Id'
    })
  })
};

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
