const House = require('../models/House');

const getAllHouses = async (req, res) => {
  try {
    const filter = {};

    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    const houses = await House.find(filter).populate('owner', 'name email');
    res.json(houses);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to fetch houses' });
  }
};

const getHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate('owner', 'name email');
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json(house);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to fetch house' });
  }
};

const createHouse = async (req, res) => {
  try {
    const { title, description, type, price, location } = req.body;

    if (!title || !description || !type || !price || !location) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const houseData = {
      title,
      description,
      type,
      price,
      location,
      owner: req.user.id,
    };

    if (req.file) {
      houseData.image = req.file.filename;
    }

    const house = await House.create(houseData);
    res.status(201).json(house);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to create house' });
  }
};

const updateHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized, you are not the owner' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedHouse = await House.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updatedHouse);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to update house' });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized, you are not the owner' });
    }

    await house.deleteOne();
    res.json({ message: 'House deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to delete house' });
  }
};

module.exports = { getAllHouses, getHouse, createHouse, updateHouse, deleteHouse };
