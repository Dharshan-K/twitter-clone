/** @format */

import MainExplore from "../Explore/MainExplore";
import SearchBar from "../utils/SearchBar";
import FollowBar from "../FollowBar/FollowBar";

export default function SuggestionsComponent() {
  return (
    <div className="bg-black w-[100vh] fixed top-0">
      <div className="ml-[40px]">
        <SearchBar />
      </div>
      <div className="ml-[40px]">
        <MainExplore />
      </div>
      <div className="ml-[40px]">
        <FollowBar />
      </div>
    </div>
  );
}
