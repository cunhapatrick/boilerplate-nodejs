const path = require('path')
// used to generate a random bytes
const crypto = require('crypto')
const multer = require('multer')

// configuration of multer, for mor options view multer documentation
module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)

        // callback that return a new random hexadecimal file name
        // first parameter null means no error, second is the name of the file
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
