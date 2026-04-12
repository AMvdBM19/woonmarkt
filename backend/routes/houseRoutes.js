const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/authMiddleware');
const {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpg, png, webp)'));
    }
  },
});

router.get('/', getAllHouses);
router.get('/:id', getHouse);
router.post('/', protect, upload.single('image'), createHouse);
router.put('/:id', protect, upload.single('image'), updateHouse);
router.delete('/:id', protect, deleteHouse);

module.exports = router;
