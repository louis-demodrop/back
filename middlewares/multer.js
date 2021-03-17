const multer = require('multer');

const audioStorage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, "public/audio");
    },
    filename: (req, res, next) => {
        const { user: { _id }, body: { title } } = req
        const parts = res.mimetype.split("/");
        next(null, `${_id}-${title}-${Date.now()}.${parts[1]}`);
    }
});

const audioFilter = (req, res, next) => {
    const fileType = res.mimetype.split("/")[0];
    if (fileType !== "audio") {
        return next(new Error("Wrong file type, audio file expected."), false);
    }
    next(null, true);
}

module.exports = {
    musicUpload: multer({ storage: audioStorage, fileFilter: audioFilter })
}