"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentToComment = exports.addCommentsToTweet = void 0;
const tweetController_1 = require("./tweetController");
const commentSchema_1 = require("../data/commentSchema");
const addCommentsToTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("commenting started................");
    const { commentData, tweetID, userID } = req.body;
    if (!commentData || (!tweetID && !userID)) {
        res.status(201).json({ message: "user credentials missing" });
        return;
    }
    if (tweetID) {
        const commentObject = yield commentSchema_1.commentModel.create({
            commentID: (0, tweetController_1.generateUUID)().toString(),
            commentData: commentData,
            userID: userID,
            like: 0,
            replies: [],
        });
        yield commentSchema_1.nestedCommentModel.create({
            tweetID: tweetID,
            Comment: [commentObject],
        });
        res.status(401).json({ message: "commented on the post" });
        return;
    }
    else if (userID) {
    }
});
exports.addCommentsToTweet = addCommentsToTweet;
const addCommentToComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetID, userID, comment, commentID } = req.body;
    if (!comment && !userID && (tweetID || commentID)) {
        res.status(201).json({ message: "user credentials missing" });
        return;
    }
    if (tweetID) {
        const addComment = yield commentSchema_1.commentModel.create({
            commentID: (0, tweetController_1.generateUUID)().toString(),
            tweetID: tweetID,
            parentComment: null,
            commentData: comment,
            userID: userID,
            like: 0,
        });
        console.log("addComment", addComment);
        res.status(400).json({ message: "comment successfully added to tweet" });
        return;
    }
    else if (commentID) {
        const addReply = yield commentSchema_1.commentModel.create({
            commentID: (0, tweetController_1.generateUUID)().toString(),
            tweetID: null,
            parentComment: commentID,
            commentData: comment,
            userID: userID,
            like: 0,
        });
        console.log("addReply", addReply);
        res.status(400).json({ message: "comment successfully added to comment" });
        return;
    }
    return;
});
exports.addCommentToComment = addCommentToComment;
