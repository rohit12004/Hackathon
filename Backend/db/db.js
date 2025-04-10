// const mongoose  = require('mongoose')

// function connectToDb(){
//     mongoose.connect(process.env.CONNECT_DB)
//         .then(() => console.log('connected to db'))
//         .catch(err => console.log(err))
// }

// module.exports = connectToDb


const mongoose = require('mongoose');
require('dotenv').config();  // Load the environment variables

function connectToDb() {
    mongoose.connect(process.env.CONNECT_DB)
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log('Error connecting to DB:', err));
}

module.exports = connectToDb;
