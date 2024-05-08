const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  deleteThoughts,
  updateThoughts
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// // /api/users/:thoughtsId
router.route('/:thoughtsId').get(getSingleThoughts).delete(deleteThoughts).put(updateThoughts);

module.exports = router;
