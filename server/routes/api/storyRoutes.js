const router = require('express').Router();
<<<<<<< HEAD
=======

>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f
const {
    getAllStories,
    getSingleStory,
    postStory,
<<<<<<< HEAD
    deleteStory,
} = require('../../controllers/storyController');

// /api/stories/
router.route('/').get(getAllStories).post(postStory)

// /api/stories/:storyId
router.route('/:storyId').get(getSingleStory).delete(deleteStory);
=======
} = require('../../controllers/storyController');


router
    .route('/')
    .get(getAllStories)
    .post(postStory)

router
    .route('/:storyName')
    .get(getSingleStory);
>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f

module.exports = router;