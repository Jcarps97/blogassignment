const withAuth = require('../../utils/auth')
const router = require('express').Router();
const { Comment, Post } = require('../../models')

//Find a post
router.get('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
      });
  
      const commentData = await Comment.findAll({
        where: {
          post_id: req.params.id,
        }
      })
  
      if (!postData) {
        res.status(404).json({ message: "No post found with that id :("})
        return;
      }
  
      const comments = commentData.map((comment) =>
        comment.get({ plain: true })
        );
  
      const post = postData.get({ plain: true});
  
      res.render('post', { 
        layout: 'dashboard',
        post,
        comments,
        logged_in: req.session.logged_in,
      });
  
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });
  
  //Create a new Post
  router.post('/', withAuth, async (req, res) => {
      try {
        console.log(...req.body)
          const newPost = await Post.create({
              ...req.body,
              user_id: req.session.user_id, 
          });
  
          res.status(200).json(newPost);
      } catch (err) {
          res.status(400).json(err);
      }
  });
  
  //Delete Post
  router.delete('/:id', withAuth, async (req, res) => {
      try {
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
            user_id:req.session.user_id, 
          }
        });
    
        if(!postData) {
          res.status(404).json({ message: "No post found with id :("})
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
  });
  
  //Update Post
  router.put('/:id', (req, res) => {
      Post.update( req.body, {
          where: {
              id: req.params.id,
              user_id: req.session.user_id, 
          }
      })
      .then((updatedPost) => {
          res.json(updatedPost)
      })
      .catch((err) => { res.json(err)
      console.log(err) })
  });
    
  router.get('/', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: {
            user_id: req.session.user_id,
          },
      });
  
      const comments = commentData.map((comment) =>
        comment.get({ plain: true })
      );
  
      res.render('comments', { 
        layout: 'dashboard',
        comments,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.redirect('/api/users/login'); // login handlebar
    }
  });
  
  // NEW COMMENT  
  router.get('/:id/new/comment', withAuth, (req, res) => {
    const post = {id: req.params.id}
    res.render('new-comment', { 
      layout: 'dashboard',
      post,
      logged_in: req.session.logged_in,
    });
  });
  
  module.exports = router;