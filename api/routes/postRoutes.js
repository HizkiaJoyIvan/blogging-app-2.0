const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
} = require("../controller/postController");
const verifyToken = require("../middleware/verifyToken");

router.get("/:id", verifyToken, getPost);

router.get("/", getAllPosts);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.put("/:id", updatePost);

module.exports = router;
