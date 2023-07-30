/** @format */
import * as mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentID: { type: String, required: true },
  tweetID: { type: String, default: null },
  parentComment: { type: String, default: null },
  commentData: { type: String, required: true },
  userID: { type: String, required: true },
  like: { type: Number, required: true },
});

const nestedComment = new mongoose.Schema({
  tweetID: { type: String, required: true },
  Comment: [commentSchema],
});
const ImageSchema = new mongoose.Schema({
  filename: {
    required: true,
    type: String,
  },
  fileId: {
    required: true,
    type: String,
  },
  tweetID: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

export const Image = mongoose.model("Image", ImageSchema);

export const commentModel = mongoose.model("comment", commentSchema);
export const nestedCommentModel = mongoose.model(
  "nestedComment",
  nestedComment
);
