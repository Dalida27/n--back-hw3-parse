require('dotenv').config();
const cron = require('node-cron');
const scrapeOLX = require('./contollers/scrapeOLX.js');


cron.schedule('*/30 * * * *', () => {
  console.log('Running cron job every minute');
  scrapeOLX();
});
