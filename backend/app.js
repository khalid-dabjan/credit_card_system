const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const keys = require('./config/keys');


const app = express();
app.use(cors());
// const router = express.Router();
const API_PORT = process.env.NODE_ENV == 'test' ? 3007 : 3001;
if (process.env.NODE_ENV == 'test') {//setting uo in memory DB for testing only
    const MongoMemoryServer = require('mongodb-memory-server');

    const mongoServer = new MongoMemoryServer.MongoMemoryServer();

    mongoose.Promise = Promise;
    mongoServer.getConnectionString().then((mongoUri) => {
        const mongooseOpts = {
            // options for mongoose 4.11.3 and above
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        };
        mongoose.connect(mongoUri, mongooseOpts);
    });
} else {
    // 'mongodb://<your-db-username-here>:<your-db-password-here>@ds249583.mlab.com:49583/fullstack_app';

// connects our back end code with the database
    mongoose.connect('mongodb+srv://admin-user_1:03vINUhilf91c6vO@cluster0-bdda3.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

}
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// this is our MongoDB database
const dbRoute = keys.mongoURI;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
// app.use('/api', router);

require('./routes/cardRoutes')(app);


// append /api for our http requests

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
module.exports = app;
