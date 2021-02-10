const router = require('express-promise-router')();
const { upload } = require('../controllers/music');

router.route('/upload')
    .post(upload)

module.exports = router;
