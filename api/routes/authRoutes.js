const router = require('express').Router()
const {register, login, getUsers} = require('../controller/authController')

router.post('/register', register)

router.post('/login', login)

router.get('/', getUsers)

module.exports = router