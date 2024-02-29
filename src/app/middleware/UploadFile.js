const multer = require('multer')
const storage = (path) => {
    return multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, path)
        },
        filename: function (req, file, cb){
            cb(null, Date.now() + file.originalname);
        }
    })
}
function upload(path){
    return multer({
        storage: storage(path),
        fileFilter: function (req, file, cb){
            if (file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg')
            {
                req.body.contain_file = true
                cb(null, true)
            }
            else
            {
                req.body.errorUpload = 'invalid image'
                return cb(null, false, new Error('goes wrong on the mimetype'))
            }
        }
    })
}

module.exports = upload