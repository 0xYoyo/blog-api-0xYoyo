const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const latestPosts = await Post.find().sort({ timestamp: -1 }).limit(3);
  res.json(latestPosts);
});

// Display list of all unpublished posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({ published: true }).sort({
    timestamp: -1,
  });
  res.json(allPosts);
});

// Display list of all posts.
exports.admin_post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({ timestamp: -1 });
  res.json(allPosts);
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const [post, commentsOnPost] = await Promise.all([
    Post.findById(req.params.id).exec(),
    Comment.find({ parentPost: req.params.id }).sort({ timestamp: -1 }).exec(),
  ]);

  if (post === null) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json([post, commentsOnPost]);
});

// Handle post create on POST.
exports.post_create_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified"),
  body("postContent")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified"),
  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    // Create post
    const post = new Post({
      title: req.body.title,
      postContent: req.body.postContent,
    });

    if (!errors.isEmpty()) {
      res.json({
        post: post,
        errors: errors.array(),
      });
      return;
    } else {
      const newPost = await post.save();
      res.json(newPost);
    }
  }),
];

// Handle post publish on PUT.
exports.post_publish_put = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const newPost = new Post({
    ...post,
    published: !post.published,
    _id: post._id,
  });
  changedPost = await Post.findByIdAndUpdate(req.params.id, newPost, {});
  res.json(changedPost);
});

// Handle post delete on DELETE.
exports.post_delete = asyncHandler(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  res.json(deletedPost);
});
