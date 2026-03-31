const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController');

router.get('/', getAllHouses);
router.get('/:id', getHouse);
router.post('/', protect, createHouse);
router.put('/:id', protect, updateHouse);
router.delete('/:id', protect, deleteHouse);

module.exports = router;
