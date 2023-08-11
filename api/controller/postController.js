const pool = require("../models/db");
const jwt = require("jsonwebtoken");

const getAllPosts = (req, res) => {

  const category = req.query.cat;
  const page = req.query.page;
  const limit = req.query.limit;
  const offset = (page-1)*limit;

  const q = category
    ? "SELECT * FROM post WHERE cat = $1 LIMIT $2 OFFSET $3"
    : "SELECT * FROM post LIMIT $1 OFFSET $2";

  const values = category ? [category, limit, offset] : [limit, offset];

  pool.query(q, values, (error, results) => {
    if(error) return res.status(500).send(error);

    pool.query("SELECT COUNT(*) FROM post", (countError, countResults) => {
      if(countError) return res.status(500).send(error);
        
        const totalCount = parseInt(countResults.rows[0].count);
        const totalPages = Math.ceil(totalCount/limit);

        const response = {
          pages: totalPages,
          currentPage: page,
          results: results.rows
        };

        return res.status(200).json(response);
    });
  });
};

const getPost = (req, res) => {
  const postId = req.params.id;
  pool.query(
    "SELECT * FROM post WHERE post.post_id = $1",
    [postId],
    (error, results) => {
      if (error) return res.status(500).send(error);
      if (!results.rows.length) return res.status(404).send("Post not found");
      return res.status(200).json(results.rows[0]);
    }
  );
};

const createPost = (req, res) => {
    const { title, descriptions, img, postDate, userId, cat } = req.body;

    pool.query(
      "INSERT INTO post (title, descriptions, img, postDate, user_id, cat) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, descriptions, img, postDate, userId, cat],
      (error, results) => {
        if (error) throw error;
        return res.status(200).send("Post has been created");
      }
    );
  // })

  
};

const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, descriptions, img, cat } = req.body;
  pool.query(
    "SELECT * FROM post WHERE post.post_id = $1",
    [postId],
    (error, results) => {
      if (error) return res.status(500).send(error);
      if (!results.rows.length) return res.status(404).send("Post not found");

      pool.query(
        "UPDATE post SET title = $1, descriptions = $2, img = $3, cat = $4 WHERE post.post_id = $5",
        [title, descriptions, img, cat, postId],
        (error, results) => {
          if (error) return res.status(500).send(error);
          return res.status(200).send("Post has been updated");
        }
      );
    }
  );
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  pool.query(
    "DELETE FROM post WHERE post.post_id = $1",
    [postId],
    (error, results) => {
      if (error) return res.status(500).send(error);
      if (!results.rows.length) return res.status(404).send("Post not found");
      return res.status(200).send("Post has been deleted");
    }
  );
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
