const router = require('express-promise-router')();
const { musicUpload } = require('../middlewares/multer');

router.route('/upload')
    .post((req, res) => {
        musicUpload.single("audio")(req, res, (err) => {
            if (!err) {
                return res.status(201).json({ path: req.file.filename });
            }
            return res.status(400).json({ error: err.message });
        })
    })

module.exports = router;
