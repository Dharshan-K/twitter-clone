/** @format */

import * as Express from "express";
import { createTweet, getTweets } from "../tweets/tweetController";
import { authUser } from "../middleware/authmiddleware";
import {
  addCommentsToTweet,
  addCommentToComment,
} from "../tweets/commentController";
import { searchAPI } from "../tweets/utils/searchAPI";
import { getMessages } from "../message/chatController";
import { getHashTag, getHashTags } from "../tweets/hashtag/hashtagController";

const tweetRouter = Express.Router();

tweetRouter.route("/insertTweet").post(authUser, createTweet);
tweetRouter.route("/addComment").post(authUser, addCommentsToTweet);
tweetRouter.route("/addToComment").post(authUser, addCommentToComment);
tweetRouter.route("/search").post(searchAPI);
tweetRouter.route("/home").get(getTweets);
tweetRouter.route("/messages").post(getMessages);
tweetRouter.route("/hashtag").post(getHashTags);

export { tweetRouter };
