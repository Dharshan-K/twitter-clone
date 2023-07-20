/** @format */

import * as Express from "express";
import { itemsPool } from "../../data/connectDB";
export const getHashTag = (req: Express.Request, res: Express.Response) => {
  console.log("getting hashtags..........");
  const { hashTag } = req.body;
  console.log(hashTag);
  if (hashTag) {
    try {
      const queryhash = queryHashTag(hashTag);
      res.status(201).send(queryhash);
    } catch (error) {
      console.log(error);
      res.status(400).send("error");
    }
  }
};

export const getHashTags = async (
  req: Express.Request,
  res: Express.Response
) => {
  let { hashTag } = req.body;
  hashTag = "#" + hashTag;

  const queryResult = await itemsPool.query(
    "select * from usertweets where $1 = any(hashtags)",
    [hashTag]
  );

  res.status(201).send(queryResult.rows);
  return;
};

function queryHashTag(tagNumber: number) {
  console.log("getting into query........");
  const hashQuery = itemsPool.query("select * from hashData where tag=$1", [
    tagNumber,
  ]);
  console.log(hashQuery);
  return hashQuery;
}
