/** @format */
import { AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { MdOutlinePoll, MdSchedule, MdOutlineLocationOn } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

export default function TweetEditor() {
  const styles = {
    "tweet-options": "m-2 text-xl text-blue-500",
  };
  const [tweet, setTweet] = useState("");
  const sendTweet = async () => {
    const data = { tweet: tweet };
    const config = {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    };
    console.log("sending tweet...........");
    console.log(tweet);
    await axios
      .post("http://localhost:4000/tweet/insertTweet", data, config)
      .then((response) => {
        console.log(response);
      });
    window.location.reload();
  };
  return (
    <div
      id="tweetEditor"
      className="flex p-4 w-[80vh] bg-black max-w-3xl border-2 border-[#404040]"
    >
      <div className="w-10">
        <img
          className="rounded-full w-8 h-8"
          src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
        />
      </div>
      <div className="basis-11/12 w-[400px]">
        <textarea
          className="w-full py-2 bg-black text-white rounded-md resize-none outline-none"
          rows={3}
          value={tweet}
          placeholder="What's happening?"
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        ></textarea>

        <hr></hr>
        <div className="flex  mt-2">
          <span className={styles["tweet-options"]}>
            <AiOutlinePicture />
          </span>
          <span className={styles["tweet-options"]}>
            <HiOutlineGif />
          </span>
          <span className={styles["tweet-options"]}>
            <MdOutlinePoll />
          </span>
          <span className={styles["tweet-options"]}>
            <MdSchedule />
          </span>
          <span className={styles["tweet-options"]}>
            <BsEmojiSmile />
          </span>
          <span className={styles["tweet-options"]}>
            <MdOutlineLocationOn />
          </span>
          <button
            className="px-4 ml-52 py-2 font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600"
            onClick={sendTweet}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
