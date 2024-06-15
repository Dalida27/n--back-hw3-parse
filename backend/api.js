const express = require('express');
const router = express.Router();
const scrapeOLX = require('./contollers/scrapeOLX.js');

router.get('/api/new-ads', async (req, res) => {
  try {
    const newMovies = await scrapeOLX();
    res.setHeader('Content-Type', 'application/json');
    res.json({ newMovies });
  } catch (error) {
    console.error('Error in /api/new-ads route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
