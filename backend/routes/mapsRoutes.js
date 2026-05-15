const express = require('express');
const router = express.Router();

// Proxy Google Places Autocomplete to avoid CORS issues
router.get('/autocomplete', async (req, res) => {
  try {
    const { input } = req.query;
    if (!input) {
      return res.status(400).json({ message: 'Input query is required' });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Google Maps API key not configured' });
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error('[Maps Autocomplete]', err.message);
    res.status(500).json({ message: 'Autocomplete failed' });
  }
});

// Proxy Google Places Details
router.get('/place-details', async (req, res) => {
  try {
    const { placeId } = req.query;
    if (!placeId) {
      return res.status(400).json({ message: 'Place ID is required' });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Google Maps API key not configured' });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=geometry,address_components,formatted_address&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error('[Maps Place Details]', err.message);
    res.status(500).json({ message: 'Place details failed' });
  }
});

// Proxy Geocoding
router.get('/geocode', async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Google Maps API key not configured' });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error('[Maps Geocode]', err.message);
    res.status(500).json({ message: 'Geocoding failed' });
  }
});

module.exports = router;
