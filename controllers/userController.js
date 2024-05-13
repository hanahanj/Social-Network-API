const {User} = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },


       // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends');
        // .populate('thoughts');


      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


      async createUser(req, res) {
        try {
          const dbUserData = await User.create(req.body);
          res.json(dbUserData);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
        // If the user exists, delete it
        await User.findByIdAndDelete({_id: req.params.userId});
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
      },

      async createFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
          );
      
          if (!user) {
            return res.status(404).json({ message: 'User not found, no friend added' });
          }
      
          res.json({ message: 'Added a friend to your user', user });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No User with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async deleteFriend(req, res) {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
    
          // Find the user by ID
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          // Find the index of the friend in the friends array
          const friendIndex = user.friends.findIndex(friend => friend.toString() === friendId);
          if (friendIndex === -1) {
            return res.status(404).json({ message: 'Friend not found in the user\'s friend list' });
          }
    
          // Remove the friend from the friends array
          user.friends.splice(friendIndex, 1);
    
          // Save the updated user
          await user.save();
    
          // Respond with success message
          res.json({ message: 'Friend deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
        }
      }
    
    
    


};