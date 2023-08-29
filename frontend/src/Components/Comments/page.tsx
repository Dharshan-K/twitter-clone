/** @format */

import { useParams } from "react-router-dom";
import SidebarComponent from "../HomePage/Sidebar";
import SuggestionsComponent from "../HomePage/SuggestionsPage";
import { CommentComponent } from "./CommentComponent";
import TweetComponent from "../utils/TweetComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/home.css";
export const CommentPage = () => {
  const { id } = useParams();
  const i_d = id || "default_id";
  const [tweet, settweet] = useState({
    tweetid: "",
    tweetwritten: "",
    writtenBy: "",
    likes: 0,
    retweets: 0,
    createdAt: Date(),
    hashtags: null,
  });
  useEffect(() => {
    const getTweets = async () => {
      const response = await axios.get(
        `https://twitter-backend-rcbd.onrender.com/tweet/tweet/${i_d}`
      );
      settweet(response.data[0]);
    };
    getTweets();
  }, []);

  return (
    <div>
      <div className="flex">
        <span id="Sidebar" className="basis-2/6">
          <SidebarComponent />
        </span>
        <div id="HomeBar" className="basis-2/5 ml-[380px]">
          <div>
            <TweetComponent tweetContent={tweet} />
          </div>
          <div>
            <CommentComponent id={i_d} />
          </div>
        </div>
        <div className="basis-2/6">
          <div className="">
            <SuggestionsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
