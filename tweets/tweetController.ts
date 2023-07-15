/** @format */

import { itemsPool } from "../data/connectDB";
import * as Express from "express";
import { v4 as uuidv4 } from "uuid";

export const generateUUID = () => {
  return uuidv4();
};

export const getTweets = async (req: Express.Request, res: Express.Response) => {
  const tweets = await itemsPool.query("select * from usertweets");
  console.log(tweets.rows)
  res.status(201).send(tweets.rows)
}

export const createTweet = (req: Express.Request, res: Express.Response) => {
  const { tweet } = req.body;
  const hashTags = getHastags(tweet);
  
  const users = getUsers(tweet);
  console.log(users);
  console.log(hashTags);
  const { userid, username } = req.User;
  const tweetID = generateUUID();
  console.log("processing the tweets.........");

  itemsPool.query(
    `insert into usertweets values($1,$2,$3,$4,$5,$6,$7,$8)`,
    [tweetID, tweet, userid, 0, 0, new Date(), hashTags,users],
    (error: any, results: any) => {
      if (error) {
        console.log("Error executing query", error);
        res.status(400).json({ message: "erro" });
        return;
      }
      res.status(201).json({ message: "inserted tweet" });
      console.log("inserted values");
    }
  );
};

function getHastags(tweetString: String): RegExpMatchArray | null {
  const checkHashtag = /#\w+/g;
  
  const hashTags: RegExpMatchArray | null = tweetString.match(checkHashtag);
  tweetString.replace(checkHashtag,"<Link href={http://localhost:3000/search/`${}`}>#</Link>")
  return hashTags;
}

function getUsers(tweetString: String): RegExpMatchArray | null {
  const checkUser = /@\w+/g;
  const users: RegExpMatchArray | null = tweetString.match(checkUser);
  return users;
}


