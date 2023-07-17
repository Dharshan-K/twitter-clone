/** @format */

// import LoginComponent from "@/app/User/login";
import SidebarComponent from "./Components/HomePage/Sidebar";
import MainPage from "./Components/HomePage/mainPage";
import SuggestionsComponent from "./Components/HomePage/SuggestionsPage";
import TweetComponent from "./Components/utils/TweetComponent";
import SearchBar from "./Components/utils/SearchBar";
import MainHashtag from "./Components/Explore/MainHashtag";
import MainExplore from "./Components/Explore/MainExplore";
import FollowComponent from "./Components/FollowBar/FollowComponent";
import TweetEditor from "./Components/utils/TweetEditor";
import HomeHeader from "./Components/HomePage/HomeHeader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/4 fixed">
          <SidebarComponent />
        </div>
        <div className="basis-2/4 ml-[384px] sticky">
          <HomeHeader />
          <TweetEditor />
          <MainPage />
        </div>
        <div className="basis-6/12 bg-black">
          <div className="ml-6 sticky overflow-visible top-0">
            <SuggestionsComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
