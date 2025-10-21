const express = require('express');
const path = require('path');
const StatsCache = require('../utils/statsCache');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

// Initialize stats cache with file watching
const statsCache = new StatsCache(DATA_PATH);

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
    const stats = await statsCache.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = { router, statsCache };