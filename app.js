require('dotenv').config({ path: `./configs/${process.env.NODE_ENV}.env` })

global.__basedir = __dirname;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database.")
        app.listen(process.env.PORT, () => console.log(`Back end is running on PORT ${process.env.PORT}`));
    })

module.exports = app;
