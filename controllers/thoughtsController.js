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

      async deleteReactions(req, res) {
        try {
            // Find the thought by its ID
            const thought = await Thoughts.findById(req.params.thoughtId);
            
            // Check if the thought exists
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            
            // Find the index of the reaction in the reactions array
            const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === req.params.reactionId);
            
            // Check if the reaction exists
            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'No reaction with that ID for the given thought' });
            }
            
            // Remove the reaction from the reactions array
            thought.reactions.splice(reactionIndex, 1);
            
            // Save the updated thought
            await thought.save();
    
            // Respond with success message
            return res.json({ message: 'Reaction deleted successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    
    
    
    

};