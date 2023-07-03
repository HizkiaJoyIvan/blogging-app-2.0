const pool = require('../models/db')

export const getAllPosts = (req,res) => {
    const q = req.query.cat ? 'SELECT * FROM post WHERE cat = $1' : 'SELECT * FROM post'
    pool.query(q, [req.query.cat], (error, results) => {
        if(error) return res.status(500).send(error)
        return res.status(200).json(results.rows)
    })
}