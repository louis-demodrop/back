const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());
app.use(express.static("public"));

const passportConfig = require('./middlewares/passport');

const userRoute = require('./routes/user');
const musicRoute = require('./routes/music');
app.use('/api/user', userRoute);
app.use('/api/music', musicRoute);

app.get('/api', (req, res) => res.send('Demodrop Api v1'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database.")
        app.listen(8000, () => console.log("Back end is running on PORT 8000"));
    })

module.exports = app;
