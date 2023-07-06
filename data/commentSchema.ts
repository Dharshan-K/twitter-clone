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

export const commentModel = mongoose.model("comment", commentSchema);
export const nestedCommentModel = mongoose.model(
  "nestedComment",
  nestedComment
);
