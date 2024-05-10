const {Thoughts} = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
          const thoughts = await Thoughts.find();
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },

        // Get a single thought
  async getSingleThoughts(req, res) {
    try {
       
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
      



      async createThoughts(req, res) {
        try {
          const dbThoughtsData = await Thoughts.create(req.body);
          res.json(dbThoughtsData);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async deleteThoughts(req, res) {
        try {
          const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });
    
          if (!thoughts) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
        // If the user exists, delete it
        await Thoughts.findByIdAndDelete({_id: req.params.thoughtsId});
        res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
      },

      async updateThoughts(req, res) {
        try {
          const thoughts = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thoughts) {
            return res.status(404).json({ message: 'No Thought with this id!' });
          }
    
          res.json(thoughts);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },


      async createReactions(req, res) {
        try {
          const thoughts = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body} },
            { new: true }
          );
      
          if (!thoughts) {
            return res.status(404).json({ message: 'Thought not found, no reaction added' });
          }
      
          res.json({ message: 'Added a reaction to the thought', thoughts });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

};