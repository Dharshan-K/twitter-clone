/** @format */
"use client";
import { AiOutlineSend, AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
// import { ChatDisplay } from "./chatDisplay";

export interface messageInterface {
  user_from: string;
  user_to: string;
  message_data: string;
  posted_at: string;
  indexno: number;
}

export default function ChatBox(props: { messages: messageInterface[] }) {
  const [message, setMessage] = useState("");

  console.log("message box", props.messages);

  const sendMessage = () => {
    var socket = io("http://localhost:4000");
    socket.on("connect", () => {
      console.log(socket.id);
    });
    if (message) {
      socket.emit(
        "chat message",
        localStorage.getItem("toUser"),
        localStorage.getItem("userName"),
        message
      );
    }
    setMessage("");
  };

  //

  return (
    <div className="bg-black w-[575px] h-[56px] max-h-[200px] flex flex-col rounded-lg">
      <div id="Profile-Header" className="text-white">
        <h1>{localStorage.getItem("toUser")}</h1>
      </div>
      <div id="message-Container" className="text-white">
        {props.messages.map((message: messageInterface) => {
          if (message.user_from === localStorage.getItem("userName")) {
            return (
              <div
                key={message.indexno}
                className="w-[30vh] p-1 max-w[50vh] bg-[#1d9bf0] rounded-xl text-white m-[10px] right-1"
              >
                <div className="mx-4">{message.message_data}</div>
              </div>
            );
          } else {
            return (
              <div
                key={message.indexno}
                className="p-1 w-[30vh] max-w[50vh] rounded-xl  bg-gray-500 text-white m-[10px] right-1"
              >
                <div>{message.message_data}</div>
              </div>
            );
          }
        })}
      </div>
      <div
        id="chatBar"
        className="flex w-[500px] h-[44px] bg-gray-700 rounded-full fixed bottom-0"
      >
        <div
          id="chatOptions"
          className="basis-1/4 m-3 text-blue-700 text-xl flex"
        >
          <AiOutlinePicture className="basis-1/3 mx-1" />
          <HiOutlineGif className="basis-1/3 mx-1" />
          <BsEmojiSmile className="basis-1/3 mx-1" />
        </div>
        <div className="my-3  basis-2/3">
          <input
            className=" bg-gray-700 w-[40vh]  resize-none basis-8/12 outline-none text-white"
            placeholder="message"
            id="message-input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <div className="basis-[50px] w-[20vh] my-2 flex- justify-end">
          <button onClick={sendMessage}>
            <AiOutlineSend
              id="sendButton"
              className=" mb-4 text-white text-2xl flex w-[120px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
