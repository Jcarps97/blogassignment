const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

router.use('/comment', commentRoutes);
router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;