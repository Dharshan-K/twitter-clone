/** @format */
import { BsThreeDots } from "react-icons/bs";
export const ChatProfile = () => {
  return (
    <div className="flex bg-black text-white m-2 min-height-screen max-w-[371px]">
      <div id="profilepicture" className="basis-[50px]">
        <img
          className="w-8 h-8 rounded-full"
          src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
        />
      </div>
      <div className="grid grid-row-2 basis-[40vh]">
        <div className="row-span-1">
          <span>Dharshan</span>
          <span>kd_prog</span>
        </div>
        <div className="row-span-1">
          <span>how are you</span>
        </div>
      </div>
      <div className="basis-[30px]">
        <BsThreeDots />
      </div>
    </div>
  );
};
