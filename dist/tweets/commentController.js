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
exports.getNestedComments = exports.getComment = exports.addCommentToComment = exports.addCommentsToTweet = void 0;
const tweetController_1 = require("./tweetController");
const commentSchema_1 = require("../data/commentSchema");
const addCommentsToTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentData, tweetID, userID } = req.body;
    if (!commentData || (!tweetID && !userID)) {
        res.status(201).json({ message: "user credentials missing" });
        return;
    }
    const commentObject = yield commentSchema_1.commentModel.create({
        commentID: (0, tweetController_1.generateUUID)().toString(),
        tweetID: tweetID,
        parentComment: null,
        commentData: commentData,
        userID: userID,
        like: 0,
    });
    const tweetPresent = yield commentSchema_1.nestedCommentModel.find({ tweetID: tweetID });
    if (tweetPresent.length > 0) {
        yield commentSchema_1.nestedCommentModel.findOneAndUpdate({ tweetID: tweetID }, { $push: { Comment: commentObject } });
    }
    else {
        const tweetComment = yield commentSchema_1.nestedCommentModel.create({
            tweetID: tweetID,
            Comment: [commentObject],
        });
    }
    res.status(201).json({ message: "commented on the post" });
    return;
});
exports.addCommentsToTweet = addCommentsToTweet;
const addCommentToComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, commentData, commentID } = req.body;
    if (!commentData && !userID && !commentID) {
        res.status(201).json({ message: "user credentials missing" });
        return;
    }
    const addComment = yield commentSchema_1.commentModel.create({
        commentID: (0, tweetController_1.generateUUID)().toString(),
        tweetID: null,
        parentComment: commentID,
        commentData: commentData,
        userID: userID,
        like: 0,
    });
    res.status(400).json({ message: "comment successfully added to comment" });
    return;
    return;
});
exports.addCommentToComment = addCommentToComment;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Comments = yield commentSchema_1.nestedCommentModel.find({ tweetID: id });
    res.status(201).send(Comments[0]);
});
exports.getComment = getComment;
const getNestedComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Comments = yield commentSchema_1.commentModel.find({ parentComment: id });
    res.status(201).send(Comments);
});
exports.getNestedComments = getNestedComments;
