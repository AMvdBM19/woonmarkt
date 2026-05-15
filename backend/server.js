const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const authRoutes = require('./routes/authRoutes');
const houseRoutes = require('./routes/houseRoutes');
const aiRoutes = require('./routes/aiRoutes');
const mapsRoutes = require('./routes/mapsRoutes');

const app = express();

// CORS Configuration from environment
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map(o => o.trim());
app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));

// Trust proxy (for nginx-proxy-manager)
app.set('trust proxy', 1);

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/maps', mapsRoutes);

const PORT = process.env.PORT || 3001;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
