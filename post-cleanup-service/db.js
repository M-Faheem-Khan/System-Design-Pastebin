const mongoose = require('mongoose');

const config = require('./config')

exports.connect = () => {
    mongoose.connect(config.MONGO_URI, {
        useUnifiedTopology: true,
    }).then(() => {
        console.log(`Sucessfully connected to database`);
    }) .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

// EOF