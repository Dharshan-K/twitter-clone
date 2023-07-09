/** @format */
import { BsThreeDots } from "react-icons/bs";
export default function TweetComponent() {
  return (
    <div className="flex flex-row bg-black w-[80vh] h-[62vh] border-[#404040] border-2">
      <div id="profile-picture" className="basis-[70px]">
        <img
          className="border-1 rounded-full w-12 h-12 ml-2 mt-3"
          src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
        />
      </div>
      <div id="user-info" className="basis-5/6 w-96">
        <div className="flex mt-2 mb-2">
          <p className="text-white text-[16px] w-[100px] font-bold">
            Dharshan K
          </p>
          <p className="text-gray-700 text-[15px]">@kd_prog</p>
          <span className="ml-80 mt-2">
            <BsThreeDots className="text-white" />
          </span>
        </div>
        <div className="">
          <div id="tweet-content">
            <p className="text-white text-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              aliquam vitae deserunt, magnam ducimus repellendus voluptate
              excepturi quos quis? Dolores eaque amet numquam iure perferendis
              repellendus veritatis maiores, vitae ipsum?
            </p>
          </div>
          <div id="tweet-footer pt-10">
            <img
              className="border-1 rounded-xl ml-5 mt-3 "
              src="https://source.unsplash.com/random/500x300?sig=incrementingIdentifier"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
