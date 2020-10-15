const router = require('express').Router()
const Note = require('../models/Blog')
const User = require('../models/User')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router