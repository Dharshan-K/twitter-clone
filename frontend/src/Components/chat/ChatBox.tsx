/** @format */
"use client";
import { AiOutlineSend, AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { io } from "socket.io-client";
import { useState } from "react";
import axios from "axios";

export interface messageInterface {
  [index: string]: any;
  user_from: string;
  user_to: string;
  message_data: string;
  posted_at: string;
}

export default function ChatBox(props: { messages: messageInterface }) {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  console.log("props.messages", props.messages);
  const sendMessage = () => {
    var socket = io("http://localhost:4000");
    socket.on("connect", () => {
      console.log(socket.id);
    });
    if (message) {
      console.log(
        localStorage.getItem("toUser"),
        localStorage.getItem("toUserID")
      );
      socket.emit(
        "chat message",
        localStorage.getItem("toUser"),
        localStorage.getItem("userName"),
        message
      );
    }
  };

  const messages = () => {
    const messages = props.messages;
    messages.map((message: messageInterface, index: string) => {
      console.log(message);
    });
  };

  // const getMessage = async () => {
  //   const data = {
  //     from: localStorage.getItem("userName"),
  //     to: localStorage.getItem("toUser"),
  //   };
  //   console.log(data);
  //   const messages = await axios.post(
  //     "http://localhost:4000/tweet/messages",
  //     data
  //   );
  //   console.log(messages);
  // };

  return (
    <div className="bg-black w-[575px] h-[56px] fixed bottom-0 rounded-lg">
      <div id="Profile-Header"></div>
      <div id="message-Container"></div>
      <div id="chatBar" className="flex h-[44px] bg-gray-700 rounded-full">
        <div
          id="chatOptions"
          className="basis-1/4 m-3 text-blue-700 text-xl flex"
        >
          <AiOutlinePicture className="basis-1/3" />
          <HiOutlineGif className="basis-1/3" />
          <BsEmojiSmile className="basis-1/3" />
        </div>
        <div className="mb-2 basis-2/3">
          <input
            className=" bg-gray-700 outline-none text-white"
            placeholder="message"
            id="message-input"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />

          <button onClick={messages}>
            <AiOutlineSend
              id="sendButton"
              className="basis-1/6 w-32 text-white text-2xl"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
