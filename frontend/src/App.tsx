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
import "./globals.css";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div className="basis-2/6 fixed">
          <SidebarComponent />
        </div>
        <div className="basis-2/5 ml-[384px]">
          <div>
            <HomeHeader />
          </div>
          <div>
            <TweetEditor />
          </div>
          <div>
            <MainPage />
          </div>
        </div>
        <div className="basis-2/6  w-[100vh] bg-black">
          <div className="">
            <SuggestionsComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
