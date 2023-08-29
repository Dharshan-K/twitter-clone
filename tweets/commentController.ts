/** @format */

import * as mongoose from "mongoose";
import * as Express from "express";
import { generateUUID } from "./tweetController";
import { commentModel, nestedCommentModel } from "../data/commentSchema";

export const addCommentsToTweet = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { commentData, tweetID, userID } = req.body;
  if (!commentData || (!tweetID && !userID)) {
    res.status(201).json({ message: "user credentials missing" });
    return;
  }

  const commentObject = await commentModel.create({
    commentID: generateUUID().toString(),
    tweetID: tweetID,
    parentComment: null,
    commentData: commentData,
    userID: userID,
    like: 0,
  });
  const tweetPresent = await nestedCommentModel.find({ tweetID: tweetID });
  if (tweetPresent.length > 0) {
    await nestedCommentModel.findOneAndUpdate(
      { tweetID: tweetID },
      { $push: { Comment: commentObject } }
    );
  } else {
    const tweetComment = await nestedCommentModel.create({
      tweetID: tweetID,
      Comment: [commentObject],
    });
  }
  res.status(201).json({ message: "commented on the post" });
  return;
};

export const addCommentToComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { userID, commentData, commentID } = req.body;
  if (!commentData && !userID && !commentID) {
    res.status(201).json({ message: "user credentials missing" });
    return;
  }

  const addComment = await commentModel.create({
    commentID: generateUUID().toString(),
    tweetID: null,
    parentComment: commentID,
    commentData: commentData,
    userID: userID,
    like: 0,
  });
  res.status(400).json({ message: "comment successfully added to comment" });
  return;

  return;
};

export const getComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  const id = req.params.id;
  const Comments = await nestedCommentModel.find({ tweetID: id });
  res.status(201).send(Comments[0]);
};

export const getNestedComments = async (
  req: Express.Request,
  res: Express.Response
) => {
  const id = req.params.id;
  const Comments = await commentModel.find({ parentComment: id });
  res.status(201).send(Comments);
};
