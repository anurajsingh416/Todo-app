const express = require('express');
require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB database');
});

const store = new MongoDBStore({
    uri : process.env.MONGODB_URI,
    collection : 'sessions'
});

store.on('error', function (err) {
     console.log("Session store error: " + err);
})

app.use(session({
    secret: 'very_secret_value',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.get('/', (req, res) => {
    res.redirect('/user');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
