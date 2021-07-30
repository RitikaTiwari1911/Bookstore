const mongoose = require("mongoose");
require('dotenv').config();

module.exports = () => {
    //gives a native code
    mongoose.Promise = global.Promise;

    // connecting database
    mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(error => {
        console.log("Error, Connection establishment failed", error);
        process.exit();
    });

    return mongoose.connection;
} 