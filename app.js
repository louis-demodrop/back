const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

const musicRoute = require('./routes/music');
app.use('/api/music', musicRoute);

app.get('/api', (req, res) => res.send('Demodrop Api v1'));

app.listen(8000, () => console.log("Back end is running on PORT 8000"));

module.exports = app;
