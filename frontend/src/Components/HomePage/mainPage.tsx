/** @format */

"use client";

import TweetComponent from "../utils/TweetComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tweet } from "../../../types";

export default function MainPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const toTweet = useNavigate();
  useEffect(() => {
    async function getTweets() {
      try {
        const data={
          userid: localStorage.getItem("userID")
        }
        console.log(data)
        const response = await axios.get(
          `https://twitter-backend-rcbd.onrender.com/tweet/home/${localStorage.getItem("userID")}`
        );
        setTweets(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTweets();
  }, []);

  const handleClick = (id: string) => {
    toTweet(`/tweet/${id}`, { replace: true });
  };

  return (
    <div>
      {tweets.map((tweet: Tweet, index) => (
        <button
          onClick={() => {
            handleClick(tweet.tweetid);
          }}
        >
          <TweetComponent tweetContent={tweet} key={index} />
        </button>
      ))}
    </div>
  );
}
