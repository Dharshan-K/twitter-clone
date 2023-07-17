/** @format */
import { AiOutlineSend, AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import ChatBox from "./ChatBox";
import { MessageBar } from "./messageBox";
import SidebarComponent from "@/Components/HomePage/Sidebar";

export default function chatUI() {
  return (
    <div className="bg-black flex">
      <div className="basis-1/4">
        <SidebarComponent />
      </div>

      <div className="basis-2/4 bg-black max-w-[371px] overflow-y-auto">
        <MessageBar />
      </div>
      <div className="basis-1/4">
        <ChatBox />
      </div>
    </div>
  );
}
