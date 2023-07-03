const router = require('express').Router()
const {register, login} = require('../controller/authController')

router.post('/', register)

router.post('/', login)

module.exports = router