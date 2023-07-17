/** @format */

"use client";
import TweetComponent from "../utils/TweetComponent";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [tweets, setTweets] = useState([]);
  console.log("welcome to main page.....");

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
      {tweets.map((tweet, index) => (
        <TweetComponent tweetContent={tweet} key={index} />
      ))}
    </div>
  );
}
