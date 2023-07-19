/** @format */
import { useParams } from "react-router-dom";
import TweetComponent from "../utils/TweetComponent";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Hashtag() {
  const { hashtag } = useParams();
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  const [hashTags, setHashTags] = useState([
    {
      tweetid: "",
      tweetwritten: "",
      writtenby: "",
      likes: 0,
      retweets: 0,
      createdat: "",
      hashtags: [],
      usernames: null,
      userid: "",
    },
  ]);
  const getHashtag = async () => {
    const data = { hashTag: hashtag };
    const response = await axios.post(
      "http://localhost:4000/tweet/hashtag",
      data
    );
    console.log(response.data[0]);
    setHashTags(response.data);
  };

  useEffect(() => {
    getHashtag();
  }, []);
  console.log("hashTags", typeof hashTags);
  return (
    <div className="ml-96">
      {hashTags.map((hash: any, _index: number) => (
        <TweetComponent key={hash.tweetid} tweetContent={hash} />
      ))}
    </div>
  );
}
