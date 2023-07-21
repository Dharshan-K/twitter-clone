/** @format */

import ChatBox, { messageInterface } from "./ChatBox";
import { MessageBar } from "./messageHeader";
import SidebarComponent from "../HomePage/Sidebar";
import { useState, useEffect } from "react";
import { ChatProfile } from "./profileComponent";
import axios from "axios";

export default function ChatUI() {
  const [clicked, setClicked] = useState(false);
  const [users, setUsers] = useState([
    {
      user_from: "",
      user_to: "",
      message_data: "",
      posted_at: Date(),
      indexno: 0,
    },
  ]);
  const [messages, setMessages] = useState<messageInterface[]>([
    {
      user_from: "",
      user_to: "",
      message_data: "",
      posted_at: Date(),
      indexno: 0,
    },
  ]);

  const selectUser = (userName: string) => {
    const selectedUser = async (userName: string) => {
      const data = { from: localStorage.getItem("userName"), to: userName };
      const userConversations = await axios.post(
        "http://localhost:4000/tweet/messages",
        data
      );
      setMessages(userConversations.data);
    };
    selectedUser(userName);
    setClicked(true);
  };

  useEffect(() => {
    const getMessages = async () => {
      const conversation = await axios.get(
        "http://localhost:4000/tweet/friends",
        {
          params: {
            user: localStorage.getItem("userName"),
          },
        }
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
      <div className="basis-2/4 bg-black">
        {clicked ? (
          <ChatBox messages={messages} />
        ) : (
          <div className="bg-black min-h-screen"></div>
        )}
      </div>
    </div>
  );
}
