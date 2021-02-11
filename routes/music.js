const router = require('express-promise-router')();
const passport = require('passport');

const passportJWT = passport.authenticate('jwt', { session: false })
const { upload } = require('../controllers/music');

router.route('/upload')
    .post(passportJWT, upload)

module.exports = router;
