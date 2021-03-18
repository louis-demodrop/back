const router = require('express-promise-router')();
const passport = require('passport');

const passportJWT = passport.authenticate('jwt', { session: false })
const { findAll, upload, add, remove } = require('../controllers/music');

router.route('/')
    .get(passportJWT, findAll)

router.route('/upload')
    .post(passportJWT, upload, add)

router.route('/:id')
    .delete(passportJWT, remove)

module.exports = router;
