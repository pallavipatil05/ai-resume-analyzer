const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, 'uploads/')

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + '-' + file.originalname
    )

  }

})

const upload = multer({ storage })

router.post(
  '/upload',
  upload.single('resume'),
  (req, res) => {

    res.status(200).json({
      message: 'Resume Uploaded Successfully',
      file: req.file
    })

  }
)

module.exports = router