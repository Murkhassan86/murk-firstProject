const multer = require('multer'); //Multer used for file extractions e.g images

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
// need configuration of multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid Mime type");
        if (isValid) {
            error = null
        }
        cb (error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb (null, name + '-' + Date.now() + '.' + ext);
    }
});

module.exports = multer({storage: storage}).single("image");