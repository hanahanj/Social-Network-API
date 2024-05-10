const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  deleteThoughts,
  createReactions,
  updateThoughts
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// 
router.route('/:thoughtsId').get(getSingleThoughts).delete(deleteThoughts).put(updateThoughts);


//TODO: IM NOT SURE IF THIS IS THE RIGHT ROUTE
//AM I MISSING THE THOUGHTS ITEMS IN THE USER MODEL TO BE ABLE TO CONNECT CORRECTLY
router.route('/:thoughtsId/reactions').post(createReactions);

module.exports = router;
