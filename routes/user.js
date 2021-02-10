const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../middlewares/passport')
const passportLocal = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

const { validateBody, schemas } = require('../middlewares/schemaValidation');
const { register, login, checkLoginStatus, logout } = require('../controllers/auth');


router.route('/register')
    .post(validateBody(schemas.register), register)

router.route('/login')
    .post(validateBody(schemas.login), passportLocal, login)
    .get(checkLoginStatus)

router.route('/logout')
    .get(validateBody(schemas.login), passportJWT, logout)

module.exports = router;
