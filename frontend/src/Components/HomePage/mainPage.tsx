/** @format */

"use client";

import TweetComponent from "../utils/TweetComponent";
import axios from "axios";
import { useState, useEffect } from "react";

export type Tweet = {
  tweetid: string;
  tweetWritten: string;
  writtenBy: string;
  likes: number;
  retweets: number;
  createdAt: Date;
};

export type User = {
  userid: string;
  username: string;
  email: string;
  dob: Date;
  passwordhash: string;
  accesslevel: AccessLevel;
};

export type AccessLevel = "Admin" | "User" | "Anonymous";

export type Comments = User & {
  comment: string;
};

export default function MainPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  useEffect(() => {
    async function getTweets() {
      try {
        const response = await axios.get("http://localhost:4000/tweet/home");
        setTweets(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTweets();
  }, []);

  return (
    <div>
      {tweets.map((tweet: Tweet, index) => (
        <a href={`http://localhost:3000/${tweet.tweetid}`}>
          <TweetComponent tweetContent={tweet} key={index} />
        </a>
      ))}
    </div>
  );
}
