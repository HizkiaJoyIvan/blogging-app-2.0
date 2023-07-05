const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
} = require("../controller/postController");

router.get("/:id", getPost);

router.get("/", getAllPosts);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.put("/:id", updatePost);

module.exports = router;
