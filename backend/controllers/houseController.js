const House = require('../models/House');

// GET /api/houses
const getAllHouses = async (req, res) => {
  try {
    const filter = {};

    // Optional query filters
    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    const houses = await House.find(filter).populate('owner', 'name email');
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// GET /api/houses/:id
const getHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate('owner', 'name email');
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json(house);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// POST /api/houses (protected)
const createHouse = async (req, res) => {
  try {
    const { title, description, type, price, location } = req.body;

    if (!title || !description || !type || !price || !location) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const house = await House.create({
      title,
      description,
      type,
      price,
      location,
      owner: req.user.id,
    });

    res.status(201).json(house);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// PUT /api/houses/:id (protected, owner only)
const updateHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Check if the logged-in user is the owner
    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized, you are not the owner' });
    }

    const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedHouse);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// DELETE /api/houses/:id (protected, owner only)
const deleteHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Check if the logged-in user is the owner
    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized, you are not the owner' });
    }

    await house.deleteOne();
    res.json({ message: 'House deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { getAllHouses, getHouse, createHouse, updateHouse, deleteHouse };
