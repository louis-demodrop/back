require('dotenv').config({ path: `./configs/${process.env.NODE_ENV}.env` })

global.__basedir = __dirname;

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());

const passportConfig = require('./middlewares/passport');

const passportJWT = require('passport').authenticate('jwt', { session: false })
app.use('/tracks', [passportJWT, express.static('public/audio')]);

const userRoute = require('./routes/user');
const musicRoute = require('./routes/music');
app.use('/api/user', userRoute);
app.use('/api/music', musicRoute);

app.get('/api', (req, res) => res.send('Demodrop Api v1'));

const key = fs.readFileSync('/home/momo/key.pem');
const cert =  fs.readFileSync('/home/momo/cert.pem');
const secureApp = https.createServer({ key, cert }, app)

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
    .then(() => {
        console.log("Connected to database.")
        app.listen(8042, () => console.log('Back end is running on PORT 8042'));
        secureApp.listen(process.env.PORT, () => console.log(`Secured back end is running on PORT ${process.env.PORT}`));
    })
    .catch(err => console.log(err))

module.exports = app;
