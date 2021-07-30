const mongoose = require("mongoose");

module.exports = () => {

    const url = 'mongodb://localhost:27017/Bookstore'
    
    //gives a native code
    mongoose.Promise = global.Promise;

    // connecting database
    mongoose.connect(url, {
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