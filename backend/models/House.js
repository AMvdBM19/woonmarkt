const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['rent', 'sale', 'exchange'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    placeId: { type: String, default: '' },
  },
  coordinates: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
  },
  bedrooms: {
    type: Number,
    default: 0,
  },
  bathrooms: {
    type: Number,
    default: 0,
  },
  sqm: {
    type: Number,
    default: 0,
  },
  yearBuilt: {
    type: Number,
    default: null,
  },
  amenities: [{
    type: String,
  }],
  images: [{
    type: String,
  }],
  image: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

houseSchema.index({ 'address.city': 1 });
houseSchema.index({ price: 1 });
houseSchema.index({ type: 1 });
houseSchema.index({ featured: 1 });

module.exports = mongoose.model('House', houseSchema);
