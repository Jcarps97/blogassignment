const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// ALL POSTS
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id,
          },
      });
  
      let posts = postData.map((post) =>
        post.get({ plain: true })
      );

      console.log(posts);

      res.render('all-posts', { // all-posts handlebar
        layout: 'dashboard',
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.redirect('/'); // login handlebar
    }
  });

// NEW POST
router.get('/new', withAuth, (req, res) => {
    res.render('newpost', { // new-pet handlebar
      layout: 'dashboard',
      logged_in: req.session.logged_in,
    });
  });

// UPDATE POST  
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
    });

    const post = postData.get({ plain: true });
    
    res.render('edit-post', {
        layout: 'dashboard',
        post,
        logged_in: req.session.logged_in,
    });
  } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE A POST
router.get('/delete', withAuth, (req, res) => {
  res.render('edit-post', {
    layout: 'dashboard',
    logged_in: req.session.logged_in,
  });
});

module.exports = router;