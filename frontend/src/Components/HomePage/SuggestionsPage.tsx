/** @format */

import MainExplore from "../Explore/MainExplore";
import SearchBar from "../utils/SearchBar";
import FollowBar from "../FollowBar/FollowBar";

export default function SuggestionsComponent() {
  return (
    <div className="bg-black ml-[40px] fixed top-0">
      <div>
        <SearchBar />
      </div>
      <div>
        <MainExplore />
      </div>
      <div>
        <FollowBar />
      </div>
    </div>
  );
}
