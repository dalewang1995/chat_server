const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  res.send('Hello Express 233!')
})



module.exports = router