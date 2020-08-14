const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;
// createConnection - for multiple connection n normaly used is connect() for single connection.
// ERROR: This is failed
// mongoose.connect(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     auth: {
//         authdb: "admin", user: "admin", password: "admin" 
//     }
// });

mongoose.connect(conn, {
    auth: {
        authdb: process.env.MONGODB_AUTH,
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASS
    }
})

mongoose.connection.on('connected',()=> {
    console.log('Database connected');
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
});
