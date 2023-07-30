/** @format */
import { AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { MdOutlinePoll, MdSchedule, MdOutlineLocationOn } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/editor.css";

export default function TweetEditor() {
  const styles = {
    "tweet-options": "m-2 text-xl text-blue-500",
  };
  const [tweet, setTweet] = useState("");
  const [uploading, setUploading] = useState(false);
  const [id, setID] = useState("");
  const [fileData, setFile] = useState(null);

  const sendTweet = async () => {
    const data = { tweet: tweet };
    let id;
    const config = {
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    };

    await axios
      .post(
        "https://twitter-backend-rcbd.onrender.com/tweet/insertTweet",
        data,
        config
      )
      .then(async (response) => {
        console.log(response);
        setID(response.data);
        if (fileData) {
          const formInfo = new FormData();
          formInfo.append("file", fileData);
          formInfo.append("tweetID", response.data);

          try {
            setUploading(true);
            const UploadResponse = await axios.post(
              "https://twitter-backend-rcbd.onrender.com/tweet/upload",
              formInfo,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(UploadResponse.data);
          } catch (error) {
            console.error("Error uploading image:", error);
          } finally {
            setUploading(false);
          }
        }
      });
    setTweet("");
  };

  const handleFileUpload = async (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      console.log("Selected file:", file);
      setFile(file);
      const imgElement = document.getElementById("images") as HTMLImageElement;
      var fr = new FileReader();
      fr.onload = function () {
        if (imgElement) {
          imgElement.src = fr.result as string;
        }
      };
      fr.readAsDataURL(file);
      imgElement.remove();
    }
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
          className="w-full py-2 max-h-[100vh] bg-black text-white rounded-md outline-none"
          value={tweet}
          placeholder="What's happening?"
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        ></textarea>
        <img id="images" className="my-3" />
        <hr></hr>
        <div className="flex  mt-2">
          <span className={styles["tweet-options"]}>
            <div className="tweet-options">
              <label htmlFor="photoInput">
                <AiOutlinePicture />
                <input
                  type="file"
                  id="photoInput"
                  accept="image/*"
                  name="file"
                  onChange={(e) => handleFileUpload(e)}
                />
              </label>
            </div>
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
