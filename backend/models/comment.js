const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  commentContent: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  parentPost: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

CommentSchema.virtual("url", function () {
  return `api/posts/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);

// Add in case of multi-user implementation:
// createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
