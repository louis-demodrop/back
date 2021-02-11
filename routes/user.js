const router = require('express-promise-router')();
const passport = require('passport');

const passportLocal = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

const { 
    validateBody, 
    schemas: { register: registerSchema, login: loginSchema } 
} = require('../middlewares/schemaValidation');
const { register, login, checkLoginStatus, logout } = require('../controllers/auth');


router.route('/register')
    .post(validateBody(registerSchema), register)

router.route('/login')
    .post(validateBody(loginSchema), passportLocal, login)
    .get(checkLoginStatus)

router.route('/logout')
    .get(passportJWT, logout)

module.exports = router;
