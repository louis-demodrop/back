const { musicUpload } = require('../middlewares/multer');

module.exports = {
    upload: (req, res) => {
        musicUpload.single("audio")(req, res, (err) => {
            if (!err) {
                return res.status(201).json({ path: req.file.filename });
            }
            return res.status(400).json({ error: err.message });
        })
    }
}
