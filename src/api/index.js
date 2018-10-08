const express = require('express');

const location = require('./location');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏' 
  });
});

router.use('/location', location);

module.exports = router;
