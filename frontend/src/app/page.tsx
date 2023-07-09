/** @format */

import Image from "next/image";
import LoginComponent from "@/Components/login";
import SidebarComponent from "@/Components/HomePage/Sidebar";
import MainPage from "@/Components/HomePage/mainPage";
import SuggestionsComponent from "@/Components/HomePage/SuggestionsPage";
import TweetComponent from "@/Components/utils/TweetComponent";
import SearchBar from "@/Components/utils/SearchBar";
import MainHashtag from "@/Components/Explore/MainHashtag";
import MainExplore from "@/Components/Explore/MainExplore";
import FollowComponent from "@/Components/FollowBar/FollowComponent";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/4 fixed">
          <SidebarComponent />
        </div>
        <div className="basis-2/4 ml-[384px]">
          <MainPage />
        </div>
        <div className="basis-6/12 bg-black">
          <div className="ml-6">
            <SuggestionsComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
