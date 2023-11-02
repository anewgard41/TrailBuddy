const router = require('express').Router();
const postRoutes = require('./post-routes');
const userRoutes = require('./users-routes');
const commentRoutes = require('./comments-routes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;