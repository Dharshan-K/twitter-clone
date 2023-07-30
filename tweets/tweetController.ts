/** @format */

import { itemsPool } from "../data/connectDB";
import * as Express from "express";
import { v4 as uuidv4 } from "uuid";
import { nestedCommentModel } from "../data/commentSchema";

export const generateUUID = () => {
  return uuidv4();
};

export const getTweets = async (req: Express.Request, res: Express.Response) => {
  const tweets = await itemsPool.query("select * from usertweets order by createdAt asc");
  res.status(201).send(tweets.rows)
}

export const getTweet = async (req: Express.Request, res: Express.Response) => {
  const tweetID = req.params.id
  const tweet = await itemsPool.query("select * from userTweets where tweetID=$1",[tweetID])
  res.status(201).send(tweet.rows);
  
}

export const createTweet = async (req: Express.Request, res: Express.Response) => {
  const { tweet } = req.body;
  const hashTags = getHastags(tweet);
  
  const users = getUsers(tweet);
  const { userid, username } = req.User;
  const tweetID = generateUUID();

  await itemsPool.query(
    `insert into usertweets values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [tweetID, tweet, username, 0, 0, new Date(), hashTags,users,userid],
    async (error: any, results: any) => {
      if (error) {
        console.log("Error executing query", error);
        res.status(400).json({ message: "erro" });
        return;
      }
      await nestedCommentModel.create({
      tweetID: tweetID,
      Comment: [],
    });
      res.status(201).send(tweetID);
      console.log("inserted values");
    }
  );
};

function getHastags(tweetString: String): RegExpMatchArray | null {
  const checkHashtag = /#\w+/g;
  
  const hashTags: RegExpMatchArray | null = tweetString.match(checkHashtag);
  tweetString.replace(checkHashtag,"<Link href={https://twitter-backend-rcbd.onrender.com/search/`${}`}>#</Link>")
  return hashTags;
}

function getUsers(tweetString: String): RegExpMatchArray | null {
  const checkUser = /@\w+/g;
  const users: RegExpMatchArray | null = tweetString.match(checkUser);
  return users;
}

export const postLike = async (req:Express.Request,res:Express.Response)=>{
  const id = req.params.id
  await itemsPool.query("update usertweets set likes=likes+1 where tweetid=$1;",[id])
  const likesCount = await itemsPool.query("select likes from usertweets where tweetid=$1",[id])
  res.status(201).send(likesCount)
}


