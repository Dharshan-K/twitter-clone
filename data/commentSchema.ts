/** @format */
import * as mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentID: { type: String, required: true },
  commentData: { type: String, required: true },
  userID: { type: String, required: true },
  like: { type: Number, required: true },
  replies: [this],
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
