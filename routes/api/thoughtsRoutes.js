const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// // /api/users/:userId
router.route('/:thoughtsId').get(getSingleThoughts);

module.exports = router;
