const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const seedData = require('./data/seed');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', message: 'VoltStore API running' })
);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/voltstore';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
})
  .then(async () => {
    console.log('MongoDB connected');
    await seedData();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB error:', err));