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
    if (req.query.city) {
      filter['address.city'] = { $regex: req.query.city, $options: 'i' };
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.bedrooms) {
      filter.bedrooms = { $gte: Number(req.query.bedrooms) };
    }
    if (req.query.featured === 'true') {
      filter.featured = true;
    }

    const houses = await House.find(filter)
      .populate('owner', 'name email')
      .sort({ featured: -1, createdAt: -1 });
    res.json(houses);
  } catch (err) {
    console.error('[Houses]', err.message);
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
    console.error('[Houses]', err.message);
    res.status(500).json({ message: 'Failed to fetch house' });
  }
};

const createHouse = async (req, res) => {
  try {
    const { title, description, type, price, location, bedrooms, bathrooms, sqm, yearBuilt, amenities, address, coordinates, images, featured } = req.body;

    if (!title || !description || !type || !price || !location) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const houseData = {
      title,
      description,
      type,
      price,
      location,
      owner: req.user.id,
    };

    if (bedrooms) houseData.bedrooms = Number(bedrooms);
    if (bathrooms) houseData.bathrooms = Number(bathrooms);
    if (sqm) houseData.sqm = Number(sqm);
    if (yearBuilt) houseData.yearBuilt = Number(yearBuilt);
    if (featured) houseData.featured = featured === 'true' || featured === true;

    if (amenities) {
      houseData.amenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
    }
    if (address) {
      houseData.address = typeof address === 'string' ? JSON.parse(address) : address;
    }
    if (coordinates) {
      houseData.coordinates = typeof coordinates === 'string' ? JSON.parse(coordinates) : coordinates;
    }
    if (images) {
      houseData.images = typeof images === 'string' ? JSON.parse(images) : images;
    }

    if (req.file) {
      houseData.image = req.file.filename;
    }

    const house = await House.create(houseData);
    res.status(201).json(house);
  } catch (err) {
    console.error('[Houses]', err.message);
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

    // Parse JSON fields if they're strings
    if (updateData.amenities && typeof updateData.amenities === 'string') {
      updateData.amenities = JSON.parse(updateData.amenities);
    }
    if (updateData.address && typeof updateData.address === 'string') {
      updateData.address = JSON.parse(updateData.address);
    }
    if (updateData.coordinates && typeof updateData.coordinates === 'string') {
      updateData.coordinates = JSON.parse(updateData.coordinates);
    }
    if (updateData.images && typeof updateData.images === 'string') {
      updateData.images = JSON.parse(updateData.images);
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedHouse = await House.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updatedHouse);
  } catch (err) {
    console.error('[Houses]', err.message);
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
    console.error('[Houses]', err.message);
    res.status(500).json({ message: 'Failed to delete house' });
  }
};

module.exports = { getAllHouses, getHouse, createHouse, updateHouse, deleteHouse };
