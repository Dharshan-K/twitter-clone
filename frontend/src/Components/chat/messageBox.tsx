/** @format */
import { ChatProfile } from "./profileComponent";
import { MdOutlineSettings, MdOutlineChatBubbleOutline } from "react-icons/md";
export const MessageBar = () => {
  return (
    <div className="overflow-y-auto">
      <div
        id="messageHeader"
        className="max-w-[371px] max-h-[53px] bg-black text-white flex p-2"
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
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
      <div>
        <ChatProfile />
      </div>
    </div>
  );
};
