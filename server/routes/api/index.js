const router = require('express').Router();
const userRoutes = require('./userRoutes');
const storyRoutes = require('./storyRoutes');
const snippetRoutes = require('./snippetRoutes');
const storyRoutes = require('./storyRoutes');


<<<<<<< HEAD
router.use('/snippets', snippetRoutes);
router.use('/users', userRoutes);
router.use('/stories', storyRoutes);
=======
router.use('/users', userRoutes);
router.use('/snippets', snippetRoutes);
router.use('/stories', storyRoutes);

>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f


module.exports = router;
