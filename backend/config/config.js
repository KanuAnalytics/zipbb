const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../zipbb'));
  },
  filename: (req, file, cb) => {
    cb(null, '.zipbb');
  },
});

const upload = multer({ storage });

module.exports = upload;
