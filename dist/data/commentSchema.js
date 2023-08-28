"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedCommentModel = exports.commentModel = exports.Image = void 0;
/** @format */
const mongoose = require("mongoose");
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
exports.Image = mongoose.model("Image", ImageSchema);
exports.commentModel = mongoose.model("comment", commentSchema);
exports.nestedCommentModel = mongoose.model("nestedComment", nestedComment);
