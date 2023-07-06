/** @format */

import * as mongoose from "mongoose";
import * as Express from "express";
import { generateUUID } from "./tweetController";
import { commentModel, nestedCommentModel } from "../data/commentSchema";

export const addCommentsToTweet = async (
  req: Express.Request,
  res: Express.Response
) => {
  console.log("commenting started................");
  const { commentData, tweetID, userID } = req.body;
  if (!commentData || (!tweetID && !userID)) {
    res.status(201).json({ message: "user credentials missing" });
    return;
  }

  if (tweetID) {
    const commentObject = await commentModel.create({
      commentID: generateUUID().toString(),
      commentData: commentData,
      userID: userID,
      like: 0,
      replies: [],
    });
    await nestedCommentModel.create({
      tweetID: tweetID,
      Comment: [commentObject],
    });
    res.status(401).json({ message: "commented on the post" });
    return;
  } else if (userID) {
  }
};

export const addCommentToComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { tweetID, userID, comment, commentID } = req.body;
  if (!comment && !userID && (tweetID || commentID)) {
    res.status(201).json({ message: "user credentials missing" });
    return;
  }
  if (tweetID) {
    const addComment = await commentModel.create({
      commentID: generateUUID().toString(),
      tweetID: tweetID,
      parentComment: null,
      commentData: comment,
      userID: userID,
      like: 0,
    });
    console.log("addComment", addComment);
    res.status(400).json({ message: "comment successfully added to tweet" });
    return;
  } else if (commentID) {
    const addReply = await commentModel.create({
      commentID: generateUUID().toString(),
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
};
