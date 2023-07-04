const pool = require('../models/db')
const bcrypt = require('bcrypt')

const register = (req,res) => {
    const {username, email, img, pwd} = req.body

    // Check if other users with similar username or email exist
    pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email], (error, results) => {
        if(error) return res.status(500).json(error)
        if(results.rows.length) return res.status(409).json('User already exist')

        const salt = bcrypt.genSaltSync(10)
        const hashedPwd = bcrypt.hashSync(pwd, salt)

        pool.query('INSERT INTO users (username, email, img, pwd) VALUES ($1, $2, $3, $4)', [username, email, img, hashedPwd], (error, results) => {
            if(error) return res.status(500).json(error)
            return res.status(200).json('User has been created')
        })
    })
}

const login = (req,res) => {
    const {email, pwd} = req.body

    pool.query('SELECT * FROM users WHERE users.email = $1', [email], (error, results) => {
        if(error) return res.status(500).json(error)
        if(!results.rows.length) return res.status(404).json('User not found')

        const data = results.rows[0]
        const pwdIsCorrect = bcrypt.compareSync(pwd, data.pwd)
        if(!pwdIsCorrect) return res.status(400).json('Wrong password')
        return res.status(200).json(data) 
    })
}

const logout = (req,res) => {

}

const getUsers = (req,res) => {
    pool.query('SELECT * FROM users WHERE', (error, results) => {
        if(error) return res.status(500).json(error)
        return res.status(200).json(results.rows)
    })
}

module.exports = {
    register, 
    login,
    getUsers,
    logout
}