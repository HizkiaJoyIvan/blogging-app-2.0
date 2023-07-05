const pool = require("../models/db");
const jwt = require("jsonwebtoken");

const getAllPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM post WHERE cat = $1"
    : "SELECT * FROM post";
  if(!req.query.cat) {
    pool.query(q, (error, results) => {
      if (error) return res.status(500).send(error);
      return res.status(200).json(results.rows);
    });
  } else {
    pool.query(q, [req.query.cat], (error, results) => {
      if (error) return res.status(500).send(error);
      return res.status(200).json(results.rows);
    });
  }
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
  // const token = req.cookies.access_token
  // if(!token) return res.status(401).send("Not authorized")

  // jwt.verify(token, "jwtkey", (error, userInfo) => {
  //   if(error) return res.status(403).send("Token not valid")
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
