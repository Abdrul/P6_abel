const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const Ddos = require('ddos');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


const ddos = new Ddos({burst:10, limit:15});
app.use(ddos.express);

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser : true, useUnifiedTopology : true},
    (err) => {
        if(!err) {
            console.log("Mongodb connected");
        } else {
            console.log('Mongodb error' + err);
        }
    }
)


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

app.use(helmet());

module.exports = app;