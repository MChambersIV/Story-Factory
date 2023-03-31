const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removefromFriendList,
  loginUser,
} = require('../../controllers/userController');

const { authMiddleWare } = require('../../utils/auth');

// Set up GET all and POST at /api/users. Provide name of controller as callback
router.route('/').get(getAllUsers).post(createUser);

router.route('/me').get(authMiddleWare, getUserById);

router
  .route('/login')
  .post(loginUser);

// Set up GET one, PUT, and DELETE at /api/users/<id>
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addToFriendList);


router
  .route('/:userId/friends/:friendId')
  .delete(removefromFriendList);

module.exports = router;