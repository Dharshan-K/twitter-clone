/** @format */
import { AiOutlineSend, AiOutlinePicture } from "react-icons/ai";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
export default function chatUI() {
  return (
    <div className="bg-black w-[500px] h-[56px] p-2 fixed right-0 bottom-0 rounded-lg">
      <div id="chatBar" className="flex h-[44px] bg-gray-700 rounded-full">
        <span
          id="chatOptions"
          className="basis-1/4 m-3 text-blue-700 text-xl flex"
        >
          <AiOutlinePicture className="basis-1/3" />
          <HiOutlineGif className="basis-1/3" />
          <BsEmojiSmile className="basis-1/3" />
        </span>
        <input
          className="basis-2/3 bg-gray-700 outline-none text-white"
          placeholder="message"
        />
        <AiOutlineSend
          id="sendButton"
          className="basis-1/6 my-2 w-32 text-white text-2xl"
        />
      </div>
    </div>
  );
}
