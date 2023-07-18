const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post list");
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: post detail: ${req.params.id}`);
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post create POST");
});

// Handle post delete on POST.
exports.post_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post delete POST");
});
