const router = require('express').Router();

const {
  getAllSnippets,
  getSnippetByUserName,
  createSnippet,
  getSnippetsByUser,
//   addReaction,
//   removeReaction,
} = require('../../controllers/snippetController');

const { authMiddleWare } = require('../../utils/auth');
// /api/thoughts
router
  .route('/')
  .get(getAllSnippets)
  .post(createSnippet);

router
  .route('/:username')
  .get(getSnippetByUserName)

router
  .route('/me').get(getSnippetsByUser)

// router
//   .route('/:snippetId/reactions')
//   .post(addReaction);

// router
//   .route('/:snippetId/reactions/:reactionId')
//   .delete(removeReaction);

module.exports = router;