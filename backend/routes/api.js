const express = require("express");
const router = express.Router();

// Require controller modules.
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

/// POST ROUTES ///

// GET api home page.
router.get("/", post_controller.index); // User

// POST request for creating post.  NOTE This must come before routes that display post (uses id).
router.post("/admin/post", post_controller.post_create_post); // Admin

// DELETE request to delete post.
router.delete("/admin/post/:id", post_controller.post_delete); // Admin

// PUT request to change post publish status.
router.put("/admin/post/:id", post_controller.post_publish_put); // Admin

// GET request for one post.
router.get("/post/:id", post_controller.post_detail); // User, also has comment list, and create comment

// GET request for list of all published posts.
router.get("/posts", post_controller.post_list); // User

// GET request for list of all posts.
router.get("/admin/posts", post_controller.admin_post_list); // Admin

/// COMMENT ROUTES ///

// POST request for creating comment.
router.post("/post/:id/comment/", comment_controller.comment_create_post); // User

// DELETE request for deleting comment.
router.delete(
  "/post/:id/comment/:commentid",
  comment_controller.comment_delete
); // Admin

// GET request for list of all comments.
// router.get("/comments", comment_controller.comment_list);

module.exports = router;
