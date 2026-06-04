const express = require('express')

const {
  getHistory
} = require('../controllers/historyController')

const router = express.Router()

router.get('/:userId', getHistory)

module.exports = router