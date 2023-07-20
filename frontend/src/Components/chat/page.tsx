/** @format */

import ChatBox from "./ChatBox";
import { MessageBar } from "./messageBox";
import SidebarComponent from "../HomePage/Sidebar";
import { useState, useEffect } from "react";
import { ChatProfile } from "./profileComponent";
import axios from "axios";

export default function ChatUI() {
  const [users, setUsers] = useState([
    {
      user_from: "",
      user_to: "",
      message_data: "",
      posted_at: Date(),
    },
  ]);
  const [messages, setMessages] = useState({
    user_from: "",
    user_to: "",
    message_data: "",
    posted_at: Date(),
  });

  const selectUser = async (userName: string) => {
    console.log("userName", userName);
    const data = { from: localStorage.getItem("userName"), to: userName };
    const userConversations = await axios.post(
      "http://localhost:4000/tweet/messages",
      data
    );
    console.log("userConversations.data", userConversations.data);
    setMessages(userConversations.data);
  };

  useEffect(() => {
    const getMessages = async () => {
      const data = {
        from: localStorage.getItem("userName"),
        to: null,
      };
      const conversation = await axios.post(
        "http://localhost:4000/tweet/messages",
        data
      );

      setUsers(conversation.data);
    };
    getMessages();
  }, []);
  return (
    <div className="bg-black flex">
      <div className="basis-1/4 fixed">
        <SidebarComponent />
      </div>

      <div className="basis-2/4 bg-black ml-[55vh] h-[100vh] max-w-[371px] overflow-y-auto">
        <div className="">
          <MessageBar />
          {users.map((user, index) => (
            <button
              key={index}
              onClick={() => {
                selectUser(user.user_to);
              }}
            >
              <ChatProfile key={index} user={user.user_to} />
            </button>
          ))}
        </div>
      </div>
      <div className="basis-1/4">
        <ChatBox messages={messages} />
      </div>
    </div>
  );
}
