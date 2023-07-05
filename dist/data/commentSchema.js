"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedCommentModel = exports.commentModel = void 0;
/** @format */
const mongoose = require("mongoose");
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
exports.commentModel = mongoose.model("comment", commentSchema);
exports.nestedCommentModel = mongoose.model("nestedComment", nestedComment);
