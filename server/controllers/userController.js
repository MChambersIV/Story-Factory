const {User} = require('../models');
<<<<<<< HEAD
const bcrypt = require('bcryptjs')
const { signToken } = require('../utils/auth');

const userController = {
=======

const { signToken } = require('../utils/auth');

module.exports = {
>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f

  //get all users
  getAllUsers(req, res) {
      User.find({})
          .populate({
              path: 'Snippet',
              //allows to remove __v from visuals
              select: ('-__v')
          })
          .populate({
              path: 'friends',
              select: ('-__v')
          })
          .select('-__v')
          // sort by descending order by the _id value
          .sort({
              _id: -1
          })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
  },

  //get one user by id
  async getUserById({ body, user:userData }, res) {
      console.log('getuserByID');
      const user = await User.findOne({ username: userData.username }).populate({
        path: 'Snippet',

        select: ('-__v')
    });
          if (!user) {
            return res.status(404).json({ message: 'No user found with this name.' });
          }
          res.status(200).json(user);
  },

  //create user
  async createUser({ body }, res) {
      const user = await User.create(body);

      if (!user) {
          return res.status(400).json({ mesage: 'Error occured creating user.' });
      }
      const token = signToken(user);
      res.json({ token, user });
  },
  
  //loginUser
  async loginUser({body}, res) {
    const user = await User.findOne({ $or: [{ username: body.username}, {email: body.email}] });
    if (!user) {
        return res.status(400).json({message: "Can't find user with this email and/or password."});
    };
    
    const cPassword = await user.comparePassword(body.password);

    if(!cPassword) {
        return res.status(400).json({ message: 'Incorrect Password'});
    };
    const token = signToken(user);

    res.json({ token, user });
  },


  //loginUser
  async loginUser({body}, res) {
      const user = await User.findOne({ $or: [{ username: body.username}, {email: body.email}] });
      if (!user) {
          return res.status(400).json({message: "Can't find user with this email and/or password."});
      };
      
      const cPassword = await user.comparePasword(body.password);

      if(!cPassword) {
          return res.status(400).json({ message: 'Incorrect Password'});
      };
      const token = signToken(user);

      res.json({ token, user });
    },

  //update user by id
  updateUser({
      params,
      body
  }, res) {
      User.findOneAndUpdate({
              _id: params.id
          }, body, {
              new: true,
              runValidators: true
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({
                      message: 'No user found with this id.'
                  });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
  },

  //delete user
  deleteUser({
      params
  }, res) {
      User.findOneAndDelete({
              _id: params.id
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({
                      message: 'No user found with this id.'
                  });
                  return;
              }
              return dbUserData;
          })
          .then(dbUserData => {
              User.updateMany({
                      _id: {
                          $in: dbUserData.friends
                      }
                  }, {
                      $pull: {
                          friends: params.userId
                      }
                  })
                  .then(() => {
                      //deletes user's thought associated with id
                      Thought.deleteMany({
                              username: dbUserData.username
                          })
                          .then(() => {
                              res.json({
                                  message: 'User deleted successfully'
                              });
                          })
                          .catch(err => {
                              console.log(err);
                              res.status(400).json(err);
                          })
                  })
                  .catch(err => {
                      console.log(err);
                      res.status(400).json(err);
                  })
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          })
  },

  //add friends
  addToFriendList({
      params
  }, res) {
      User.findOneAndUpdate({
              _id: params.userId
          }, {
              $push: {
                  friends: params.friendId
              }
          }, {
              new: true
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({
                      message: 'No user found with this id!'
                  });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => {
              console.log(err)
              res.json(err)
          });
  },

  //delete friend
  removefromFriendList({
      params
  }, res) {
      User.findOneAndDelete({
              _id: params.thoghtId
          })
          .then(deletedFriend => {
              if (!deletedFriend) {
                  return res.status(404).json({
                      message: 'No friend found with this id.'
                  })
              }
              return User.findOneAndUpdate({
                  friends: params.friendId
              }, {
                  $pull: {
                      friends: params.friendId
                  }
              }, {
                  new: true
              });
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({
                      message: 'No friend found with this id.'
                  })
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },
};