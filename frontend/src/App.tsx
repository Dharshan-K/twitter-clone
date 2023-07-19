/** @format */
"use client";
import SidebarComponent from "./Components/HomePage/Sidebar";
import HomePage from "./Components/HomePage/HomePage";
import SuggestionsComponent from "./Components/HomePage/SuggestionsPage";
import "./globals.css";
import "../src/Components/assets/home.css";
import Hashtag from "./Components/hashtag/hashtag";

export default function Home(page: any) {
  console.log(page.props.page);
  return (
    <div>
      <div className="flex">
        <span id="Sidebar" className="basis-2/6">
          <SidebarComponent />
        </span>
        <div id="HomeBar" className="basis-2/5">
          {page.props.page === "Home" ? <HomePage /> : <Hashtag />}
        </div>
        <div className="basis-2/6">
          <div className="">
            <SuggestionsComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
