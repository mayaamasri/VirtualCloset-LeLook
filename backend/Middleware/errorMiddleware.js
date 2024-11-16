const multer = require('multer');

const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'File size is too large. Maximum size is 5MB'
            });
        }
    }
    next(err);
};

module.exports = handleUploadError;