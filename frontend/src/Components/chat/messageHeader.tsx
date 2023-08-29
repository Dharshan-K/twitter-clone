/** @format */
import { useState } from "react";

import {
  MdOutlineSettings,
  MdOutlineChatBubbleOutline,
  MdSearch,
} from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import { ChatProfile } from "./profileComponent";

export const MessageBar = () => {
  const [inputText, setInputText] = useState("");

  const handleChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      if (inputText === null) {
        return;
      } else {
        const data = { searchQuery: inputText };
        console.log(data)
        const response = await axios.post(
          "http://localhost:4000/tweet/search",
          data
        );
        console.log(response.data)
        localStorage.setItem("toUser", response.data.userQuery[0].username);
        localStorage.setItem("toUserID", response.data.userQuery[0].userid);
        setInputText("");
      }
    }
  };
  return (
    <div className="overflow-y-auto">
      <div
        id="messageHeader"
        className="max-w-[371px] max-h-screen  bg-black text-white flex p-2"
      >
        <div className="basis-4/5  font-bold m-2">Messages</div>
        <div className="basis-1/5 flex text-2xl ">
          <span className="m-2">
            <MdOutlineSettings />
          </span>
          <span className="m-2">
            <MdOutlineChatBubbleOutline />
          </span>
        </div>
      </div>
      <div>
        <div
          id="SearchBar"
          className="bg-[#202327] my-3 h-10 flex w-80 min-w-50px rounded-full"
        >
          <span className="text-[#71767b] text-2xl ml-3 mt-2">
            <MdSearch />
          </span>
          <input
            className="text-white bg-[#202327] text-lg mx-3 mt-1 outline-none"
            id="searchBarInput"
            value={inputText}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder="Search Twitter"
          />
        </div>
      </div>
    </div>
  );
};
