/** @format */

import Link from "next/link";
import FollowComponent from "./FollowComponent";

export default function FollowBar() {
  return (
    <div className="bg-[#16181c] w-[47vh] h-[360px] max-width-400px mt-5 pt-3 rounded-xl">
      <div className="ml-4">
        <span className="text-white font-bold ">Who to Follow</span>
      </div>
      <div>
        <div>
          <FollowComponent />
        </div>
        <div>
          <FollowComponent />
        </div>
        <div>
          <FollowComponent />
        </div>
        <div>
          <FollowComponent />
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
