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

};