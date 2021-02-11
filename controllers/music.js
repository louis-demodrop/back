const { Types: { ObjectId } } = require('mongoose')

const { musicUpload } = require('../middlewares/multer');
const Music = require('../models/Music');

module.exports = {
    upload: (req, res, next) => {
        musicUpload.single("audio")(req, res, (err) => {
            if (!err) {
                return next(null, req)
                //return res.status(201).json({ path: req.file.filename });
            }
            return res.status(400).json({ error: err.message });
        })
    },
    add: async (req, res) => {
        const { title } = req.body;
        const { file } = req;
        const { _id } = req.user
        
        try {
            const music = new Music({
                title,
                audio: file,
                author: ObjectId(_id)
            });
    
            const newMusic = await music.save();
            return res.status(200).send({ success: newMusic })
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    },
    remove: async (req, res) => {
        try {
            const { id } = req.params;
            let result = await Music.deleteOne({ _id: id });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
