/** @format */

import axios from "axios";
import { useState, useEffect } from "react";

export interface Comment {
  commentID: String;
  tweetID: String;
  parentComment: String;
  commentData: String;
  userID: String;
  like: Number;
}
export const CommentComponent = (props: { id: string }) => {
  const [Comment, setComment] = useState<Comment[]>([
    {
      commentID: "",
      tweetID: "",
      parentComment: "",
      commentData: "",
      userID: "",
      like: 0,
    },
  ]);
  const [inputComment, setInputComment] = useState("");
  const [replyComment, setReplyComment] = useState("");

  const postComment = async () => {
    const data = {
      commentData: inputComment,
      tweetID: props.id,
      userID: localStorage.getItem("userID"),
    };
    const response = await axios.post(
      "http://twitter-backend-rcbd.onrender.com/tweet/addComment",
      data
    );
  };

  const replyToComment = () => {};
  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `http://twitter-backend-rcbd.onrender.com/tweet/${props.id}`
      );
      setComment(response.data.Comment);
    };
    getComments();
  }, []);

  return (
    <div className="border-r-2 border-gray-600">
      <div>
        <span className="flex justify-center bg-black text-white">
          Comments
        </span>
      </div>
      <div className="bg-black flex">
        <div>
          <input
            placeholder="Comment"
            className="bg-black text-white w-[40vh] h-10 p-3 mx-5 outline-none my-3"
            value={inputComment}
            onChange={(e) => {
              setInputComment(e.target.value);
            }}
          />
        </div>
        <div className="bg-blue-500 rounded-full mt-5 w-20 h-[30px] bg-blue-500">
          <button onClick={postComment} className="px-5 py-1">
            Send
          </button>
        </div>
      </div>
      <div className="bg-black min-h-screen ">
        <p>
          {Comment.map((comment, index) => {
            return (
              <div key={index} className="ml-1 h-20 bg-black text-white pl-4">
                <div>{comment.userID}</div>
                <div className="" key={index}>
                  {comment.commentData}
                </div>
                <div className="bg-black flex">
                  <div>
                    <input
                      placeholder="Comment"
                      className="bg-black text-white w-[40vh] h-10 p-3 mx-5 outline-none my-3"
                      value={replyComment}
                      onChange={(e) => {
                        setReplyComment(e.target.value);
                      }}
                    />
                  </div>
                  <div className="bg-blue-500 rounded-full mt-5 w-20 h-[30px] bg-blue-500">
                    <button className="px-5 py-1">Send</button>
                  </div>
                </div>
              </div>
            );
          })}
        </p>
      </div>
    </div>
  );
};
