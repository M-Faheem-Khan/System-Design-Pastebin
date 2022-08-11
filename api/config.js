// Filename: config.js
// August 6, 2022

const config = {}

config['PORT'] = 9000;
config['MONGO_URI'] = process.env.MONGO_URI // 'mongodb://root:pastebin_mongo_password@localhost:27017/Pastebin?authSource=admin'

module.exports = config;
// EOF