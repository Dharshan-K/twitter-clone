/** @format */
import SearchBar from "../utils/SearchBar";
import SidebarComponent from "../HomePage/Sidebar";
import SuggestionsComponent from "../HomePage/SuggestionsPage";
import FollowBar from "../FollowBar/FollowBar";
import ExploreKeysTab from "../utils/ExploreKeys";
export default function ExploreTab() {
  return (
    <div className="flex bg-black ">
      <div className="basis-3/12">
        <SidebarComponent />
      </div>
      <div className="basis-6/12 bg-black grid grid-rows-2 justify-center h-24 p-0 border-2 border-gray-700">
        <div className="row-span-1 grid justify-center ">
          <SearchBar />
        </div>
        <div className="row-span-1">
          <ExploreKeysTab />
        </div>
      </div>
      <div className="basis-3/12 mx-4">
        <FollowBar />
      </div>
    </div>
  );
}
