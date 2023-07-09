/** @format */

import Link from "next/link";
import MainHashtag from "./MainHashtag";
export default function MainExplore() {
  return (
    <div className="bg-[#16181c] w-[47vh] h-[390px] max-width-400px mt-5 pt-3 rounded-xl">
      <div className="ml-4">
        <span className="text-white font-bold ">What's Happening</span>
      </div>
      <div>
        <div>
          <MainHashtag />
        </div>
        <div>
          <MainHashtag />
        </div>
        <div>
          <MainHashtag />
        </div>
        <div>
          <MainHashtag />
        </div>
        <div>
          <Link href="#" className="text-[#1d9bf0] mt-2 ml-3 mb-1">
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
