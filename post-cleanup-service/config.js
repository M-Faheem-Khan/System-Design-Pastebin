// Filename: config.js
// August 6, 2022

const config = {}

// Read MONGO_URI from env.
config['MONGO_URI'] = process.env.MONGO_URI
config['CLEANUP_SERVICE_RUN_INTERVAL'] = process.env.CLEANUP_SERVICE_RUN_INTERVAL ? process.env.CLEANUP_SERVICE_RUN_INTERVAL : 60000; // 60 seconds

module.exports = config;
// EOF