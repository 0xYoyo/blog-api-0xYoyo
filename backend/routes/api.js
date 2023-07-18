const express = require("express");
const router = express.Router();

// Require controller modules.
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

/// POST ROUTES ///

// GET api home page.
router.get("/", post_controller.index); // Users

// POST request for creating post.  NOTE This must come before routes that display post (uses id).
router.post("/post/create", post_controller.post_create_post); // Admin

// DELETE request to delete post.
router.delete("/post/:id/delete", post_controller.post_delete); // Admin

// GET request for one post.
router.get("/post/:id", post_controller.post_detail); // User, also has comment list, and create comment

// GET request for list of all posts.
router.get("/posts", post_controller.post_list); // User

/// COMMENT ROUTES ///

// POST request for creating comment.
router.post("/comment/create", comment_controller.comment_create_post);

// GET request for list of all comments.
// router.get("/comments", comment_controller.comment_list);

module.exports = router;
