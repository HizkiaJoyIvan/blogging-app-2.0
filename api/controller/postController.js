const pool = require('../models/db')

const getAllPosts = (req,res) => {
    const q = req.query.cat ? 'SELECT * FROM post WHERE cat = $1' : 'SELECT * FROM post'
    pool.query(q, [req.query.cat], (error, results) => {
        if(error) return res.status(500).send(error)
        return res.status(200).json(results.rows)
    })
}

const getPost = (req,res) => {
    const postId = req.params.id
    pool.query('SELECT * FROM post WHERE post.post_id = $1', [postId], (error, results) => {
        if(error) return res.status(500).send(error)
        if(!results.rows.length) return res.status(404).send('Post not found')
        return res.status(200).json(results.rows[0])
    })
}

const createPost = (req,res) => {
    const {title, descriptions, img, postDate, userId} = req.body
    pool.query('INSERT INTO post (title, descriptions, img, postDate, userId) VALUES ($1, $2, $3, $4, $5)', [title, descriptions, img, postDate, userId], (error, results) => {
        if(error) return res.status(500).send(error)
        return res.status(200).send('Post has been created')
    })
}

const updatePost = (req,res) => {
    const postId = req.params.id
    const {title, descriptions, img} = req.body
    pool.query('SELECT * FROM post WHERE post.post_id = $1', [postId], (error, results) => {
        if(error) return res.status(500).send(error)
        if(!results.rows.length) return res.status(404).send('Post not found')

        pool.query('UPDATE post SET title = $1, descriptions = $2, img = $3 WHERE post.post_id = $4', [title, descriptions, img, postId], (error, results) => {
            if(error) return res.status(500).send(error)
            return res.status(200).send('Post has been updated')
        })
    })
}

const deletePost = (req,res) => {
    const postId = req.params.id
    pool.query('DELETE FROM post WHERE post.post_id = $1', [postId], (error, results) => {
        if(error) return res.status(500).send(error)
        if(!results.rows.length) return res.status(404).send('Post not found')
        return res.status(200).send('Post has been deleted')
    })
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}