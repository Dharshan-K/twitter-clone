/** @format */

import { BsThreeDots } from "react-icons/bs";
export default function MainHashtag() {
  return (
    <div className="flex w-[348px] bg-[#16181c] text-white text-sm p-2">
      <div className="basis-3/4 ml-2">
        <div className="text-gray-600  pb-1">Trending in Country</div>
        <div>#ENGvsAUS</div>
        <div className="text-[10px]">3,402 Tweets</div>
      </div>
      <div className="basis-6 ml-20 mt-2 justify-end">
        <BsThreeDots />
      </div>
    </div>
  );
}
