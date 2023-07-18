const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  postContent: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  published: { type: Boolean, required: true, default: false },
});

PostSchema.virtual("url", function () {
  return `api/post/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);

// Add in case of multi-user implementation:
// createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
