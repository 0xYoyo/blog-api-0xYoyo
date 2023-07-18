const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Handle comment create on POST.
exports.comment_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment create POST");
});
