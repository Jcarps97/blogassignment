const withAuth = require('../../utils/auth')
const router = require('express').Router();
const { Comment, Post } = require('../../models')

//Get all comments
router.get('/', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [{model: Post}]
      });
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
});

//Get comment by id
router.get('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
      });
  
      if (!commentData) {
        res.status(404).json({ message: "No comment found with that id :("})
        return;
      }

      const comment = commentData.get({ plain: true});
  
      res.render('comment', {
        layout: 'dashboard',
        comment,
        logged_in: req.session.logged_in
      })
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

//Add new comment
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
      const commentData = await Comment.create({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.session.user_id, 
    });
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
});

//Update comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update( req.body, {
      where: {
        id: req.params.id,
      }
    })
    .then((updatedComment) => {
      res.json(updatedComment)
    })
    .catch((err) => {res.json(err),
    console.log(err) })
});

//Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        }
      });
  
      if(!commentData) {
        res.status(404).json({ message: "No comment found with that id :("})
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

//Update comment render  
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
      });
  
      const comment = commentData.get({ plain: true });
      
      res.render('edit-comment', {
          layout: 'dashboard',
          comment,
          logged_in: req.session.logged_in,
      });
    } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;