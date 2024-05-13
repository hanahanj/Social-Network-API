const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  deleteThoughts,
  updateThoughts,
  createReactions,
  deleteReactions
  
} = require('../../controllers/thoughtsController');


// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// 
router.route('/:thoughtsId').get(getSingleThoughts).delete(deleteThoughts).put(updateThoughts);


router.route('/:thoughtsId/reactions').post(createReactions);
router.delete('/:thoughtId/reactions/:reactionId', deleteReactions);
module.exports = router;
